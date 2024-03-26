import { ReactNode, createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// 초기 상태 타입
interface InitialState {
	id: string;
}

export const AuthContext = createContext(null);

const initialState: InitialState = {
	id: '',
};

export default function AuthContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState(initialState);
	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({ id: user.uid });
				console.log(user);
				localStorage.setItem('userUid', JSON.stringify(user.uid));
			} else {
				setUser(null);
			}
		});
	}, [auth]);

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
