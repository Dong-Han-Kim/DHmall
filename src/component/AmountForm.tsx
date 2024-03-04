import { ReactNode, useEffect, useState } from 'react';
import * as style from './styles/AmountForm.css';
import { useCartContext } from '../context/CartContext';

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
	const { product } = useCartContext();

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
		function amountSave() {
			product.find((item: Product) => {
				if (item.id === id) {
					item.amount = productAmount;
				}
			});
			localStorage.setItem('CartItem', JSON.stringify(product));
		}
		amountSave();
	}, [id, product, productAmount]);

	return (
		<form className={style.form}>
			<button className={style.button} onClick={decrease}>
				-
			</button>
			<input type="number" min={1} className={style.input} value={productAmount} readOnly />
			<button className={style.button} onClick={increase}>
				+
			</button>
		</form>
	);
}
