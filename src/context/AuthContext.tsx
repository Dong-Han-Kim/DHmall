import { ReactNode, createContext, useEffect, useReducer } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

// 제품 타입
interface Product {
	id: number;
	title: string;
	category: string;
	amount: number;
	description: string;
	image: string;
	price: number;
}

// 유저 상태 타입
interface UserState {
	loggedState: boolean;
	user_id: string;
	user_product: Product[];
}

type Action =
	| { type: 'login'; payload: { user: User; userCart: Product[] } }
	| { type: 'logout' }
	| { type: 'updateCart'; payload: { userCart: Product[] } };

// 초기 상태 타입
interface InitialState {
	loginState: boolean;
	user: UserState[];
	userCart: Product[];
}

export const AuthContext = createContext(null);

const initialState: InitialState = {
	loginState: false,
	user: [],
	userCart: [],
};

function reducer(state: InitialState, action: Action): InitialState {
	switch (action.type) {
		case 'login':
			return {
				...state,
				loginState: true,
				user: [
					{
						loggedState: true,
						user_id: action.payload.user.uid,
						user_product: action.payload.userCart,
					},
				],
				userCart: action.payload.userCart,
			};

		case 'logout':
			return {
				...state,
				loginState: false,
				user: [],
				userCart: [],
			};

		case 'updateCart':
			return {
				...state,
				userCart: action.payload.userCart,
			};

		default:
			break;
	}
}

export default function AuthContextProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const auth = getAuth();

	const getProductDate = async (id: string) => {
		const data = await getDoc(doc(db, 'cart', id));
		const cartData = data.data();
		dispatch({ type: 'updateCart', payload: { userCart: cartData.products } });
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch({ type: 'login', payload: { user, userCart: state.userCart } });
				getProductDate(user.uid);
			} else {
				dispatch({ type: 'logout' });
			}
		});
	}, [auth]);

	return <AuthContext.Provider value={{ user: state.user, setUser: dispatch }}>{children}</AuthContext.Provider>;
}
