import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState([]);
	const key = 'user';
	const currentUser = localStorage.getItem(key);

	useEffect(() => {
		const getUser = JSON.parse(currentUser);
		if (!getUser) return;
		setUser(getUser);
	}, [currentUser]);

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
