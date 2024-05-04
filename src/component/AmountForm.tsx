import { ReactNode, useEffect, useState } from 'react';
import * as style from './styles/AmountForm.css';
import { useCartContext } from '../context/useCartContext';

interface Product {
	id: number;
	title: string;
	category: string;
	amount: number;
	description: string;
	image: string;
}

export default function AmountForm({ id, amount }: { id: number; amount: number }): ReactNode {
	const [productAmount, setProductAmount] = useState(amount);
	const { product, setProduct } = useCartContext();
	// const key = 'CartItem';

	if (productAmount <= 0) {
		setProductAmount(1);
	}

	const decrease = () => {
		setProductAmount(productAmount - 1);
	};

	const increase = () => {
		setProductAmount(productAmount + 1);
	};

	useEffect(() => {
		// 이 부분에서 product 배열이 업데이트되었는지 확인하고, 업데이트된 경우에만 setProduct 함수 호출
		if (productAmount !== product.find((item: Product) => item.id === id)?.amount) {
			const updatedProduct = product.map((item: Product) => {
				if (item?.id === id) {
					return { ...item, amount: productAmount };
				}
				return item; // 다른 상품은 그대로 유지
			});
			// localStorage.setItem(key, JSON.stringify(updatedProduct));
			console.log(product);
			setProduct(updatedProduct);
		}
	}, [productAmount, id, product]);

	return (
		<div className={style.form}>
			<button className={style.button} onClick={decrease}>
				-
			</button>
			<input type="number" min={1} className={style.input} value={productAmount} readOnly />
			<button className={style.button} onClick={increase}>
				+
			</button>
		</div>
	);
}
