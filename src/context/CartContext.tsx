import { ReactNode, createContext, useEffect, useState } from 'react';

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
	const key = 'CartItem';

	useEffect(() => {
		const getProduct = localStorage.getItem(key);
		if (getProduct) {
			const productObj = JSON.parse(getProduct);
			if (productObj) {
				setProduct(productObj);
			}
		} else {
			setProduct([]);
		}
	}, []);

	return <CartContext.Provider value={{ product, setProduct }}>{children}</CartContext.Provider>;
}
