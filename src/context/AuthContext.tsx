import { ReactNode, createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

// 초기 상태 타입
interface InitialState {
	id: string;
}

interface Product {
	id: number;
	title: string;
	category: string;
	amount: number;
	description: string;
	image: string;
	price: number;
}

interface History {
	date: string;
	products: Product[];
}

interface HistoryDoc {
	id: string;
	history: History[];
}

export const AuthContext = createContext(null);

const initialState: InitialState = {
	id: '',
};

export default function AuthContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState(initialState);
	const auth = getAuth();
	const USER_ID = localStorage.getItem('userUid');

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({ id: user.uid });
				localStorage.setItem('userUid', JSON.stringify(user.uid));
				createHistory();
			} else {
				setUser(null);
			}
		});
	}, [auth]);

	async function createHistory() {
		const date = new Date();
		const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		const userHistory: HistoryDoc = {
			id: USER_ID,
			history: [{ date: today, products: [] }],
		};

		await setDoc(doc(db, 'history', USER_ID), { userHistory });
	}

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
