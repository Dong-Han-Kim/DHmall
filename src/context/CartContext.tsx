import { ReactNode, createContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthContext } from './useAuthContext';

interface Product {
	id: number;
	title: string;
	category: string;
	amount: number;
	description: string;
	image: string;
	price: number;
}

export const CartContext = createContext(null);

export default function CartContextProvider({ children }: { children: ReactNode }) {
	const [product, setProduct] = useState<Product[]>([]);
	const { user } = useAuthContext();
	const USER_ID = localStorage.getItem('userUid');
	const key = 'CartItem';

	useEffect(() => {
		const getProduct = localStorage.getItem(key);
		const productObj = JSON.parse(getProduct);
		if (productObj) {
			setProduct(productObj);
		}
	}, [user]);

	if (user && USER_ID) {
		const getUserProduct = async () => {
			const docRef = doc(db, 'cart', USER_ID);
			const getCartDoc = await getDoc(docRef);
			const getCartProduct = getCartDoc.data();
			if (!getCartProduct) {
				await setDoc(doc(db, 'cart', USER_ID), { product });
				return;
			} else {
				const updateCart = async () => {
					const docRef = doc(db, 'cart', USER_ID);
					await updateDoc(docRef, { product });
				};
				updateCart();
			}
		};
		getUserProduct();
	}
	return <CartContext.Provider value={{ product, setProduct }}>{children}</CartContext.Provider>;
}
