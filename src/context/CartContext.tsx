import { ReactNode, createContext, useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

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
	const getProduct = localStorage.getItem(key);

	useEffect(() => {
		if (!user) {
			const productObj = getProduct ? JSON.parse(getProduct) : null;
			if (!productObj || productObj.length === 0) return;
			setProduct(productObj);
		} else {
			const getUserProduct = async () => {
				const docRef = doc(db, 'cart', USER_ID);
				const getCartDoc = await getDoc(docRef);
				const getCartProduct = getCartDoc.data();
				if (!getCartProduct) {
					await setDoc(doc(db, 'cart', USER_ID), { product });
				} else {
					setProduct((prev) => [getCartProduct.product, ...prev]);
					updateCart();
				}
			};
			getUserProduct();
		}
	}, [getProduct, user]);

	const updateCart = async () => {
		const docRef = doc(db, 'cart', USER_ID);
		await updateDoc(docRef, { product });
	};

	return <CartContext.Provider value={{ product, setProduct }}>{children}</CartContext.Provider>;
}
