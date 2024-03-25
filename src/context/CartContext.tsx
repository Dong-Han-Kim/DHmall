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
	const [userCart, setUserCart] = useState<Product[]>([]);
	const { user } = useAuthContext();
	const key = 'CartItem';
	const userUid = localStorage.getItem('userUid');
	const getProduct = localStorage.getItem(key);
	const productObj = getProduct ? JSON.parse(getProduct) : null;

	useEffect(() => {
		if (user && userUid) {
			const getUserCart = async () => {
				const docRef = doc(db, 'cart', userUid);
				const cartStorage = await getDoc(docRef);
				const data = cartStorage.data();
				if (data) {
					setUserCart(data.product);
				} else {
					await setDoc(docRef, { product });
					setUserCart([]);
				}
			};
			getUserCart();
		}
	}, [user, userUid, product]);

	useEffect(() => {
		if (userCart.length > 0 && userUid) {
			const upDateUserProducts: Product[] = [...userCart, ...product];
			const cartDocUpdate = async () => {
				const docRef = doc(db, 'cart', userUid);
				await updateDoc(docRef, {
					product: upDateUserProducts,
				});
			};
			cartDocUpdate();
		}
		return setProduct(userCart);
	}, []);

	useEffect(() => {
		if (!productObj || productObj.length === 0) return;
		setProduct(productObj);
	}, [getProduct, productObj]);

	return <CartContext.Provider value={{ product, setProduct }}>{children}</CartContext.Provider>;
}
