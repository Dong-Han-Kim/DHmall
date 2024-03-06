import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export default function CartContextProvider({ children }: { children: ReactNode }) {
	const [product, setProduct] = useState([]);
	const key = 'CartItem';

	useEffect(() => {
		const productObj = JSON.parse(localStorage.getItem(key));
		if (!productObj || productObj.length === 0) return;
		setProduct(productObj);
	}, []);

	return <CartContext.Provider value={{ product, setProduct }}>{children}</CartContext.Provider>;
}

export const useCartContext = () => useContext(CartContext);
