import { ReactNode, createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// 초기 상태 타입
interface InitialState {
	id: string;
	name: string;
	image: string;
	nickName: string;
}

export const AuthContext = createContext(null);

const initialState: InitialState = {
	id: '',
	name: '',
	image: '',
	nickName: '',
};

export default function AuthContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<InitialState>(initialState);
	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({
					id: user.uid,
					name: user.email,
					image: auth.currentUser.photoURL,
					nickName: auth.currentUser.displayName,
				});
				localStorage.setItem('userUid', JSON.stringify(user.uid));
				console.log(user);
			} else {
				setUser(null);
			}
		});
	}, [auth]);

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
