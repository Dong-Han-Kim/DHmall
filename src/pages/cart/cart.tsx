import { useState, useEffect } from 'react';
import AmountForm from '../../component/AmountForm';
import { useCartContext } from '../../context/CartContext';
import * as style from './Cart.css';
import { Trash } from '../../assets/icons';
import NoProduct from '../../component/NoProduct';
import { useNavigate } from 'react-router-dom';

interface Product {
	id: number;
	title: string;
	category: string;
	amount: number;
	description: string;
	image: string;
	price: number;
}

export default function Cart() {
	const [totalPrice, setTotalPrice] = useState(0);
	const [payment, setPayment] = useState(false);
	const { product, setProduct } = useCartContext();
	const priceArr: number[] = [];
	const navigate = useNavigate();

	useEffect(() => {
		const result = priceArr.reduce((sum, current) => sum + current, 0);
		setTotalPrice(result);
	}, [priceArr]);

	function deleteProduct(id: number) {
		const newProductArr = product.filter((item: Product) => {
			return item.id !== id;
		});
		console.log(newProductArr);
		localStorage.setItem('CartItem', JSON.stringify(newProductArr));
		setProduct(newProductArr);
	}

	function onPurchaseHandler() {
		if (product.length !== 0) {
			alert('You have completed your purchase.');
			localStorage.removeItem('CartItem');
			setPayment(true);
			navigate('/');
		} else {
			alert('Your shopping cart is empty.');
		}
	}

	return (
		<main className={style.main}>
			<section>
				<div className={style.productInfoBox}>
					<span className={style.productInfo}>Product</span>
					<span className={style.productAmount}>Amount</span>
					<span className={style.productPrice}>Price</span>
					<span className={style.productDelete}>Delete</span>
				</div>
				<hr />
				{product.length === 0 || payment === true ? (
					<NoProduct />
				) : (
					product.map((item: Product) => {
						priceArr.push(Math.floor(item.price) * item.amount);
						return (
							<div key={item.id}>
								<div className={style.productList}>
									<div className={`${style.productInfo} ${style.product}`}>
										<img className={style.productImg} src={item.image} alt="product image" />
										<h4 className={style.productTitle}>{item.title}</h4>
									</div>
									<div className={style.productAmount}>
										<AmountForm id={item.id} amount={item.amount} />
									</div>
									<span className={style.productPrice}>${Math.floor(item.price) * item.amount}</span>
									<button className={style.productDelete} onClick={() => deleteProduct(item.id)}>
										<Trash />
									</button>
								</div>
								<hr />
							</div>
						);
					})
				)}
			</section>
			<section className={style.cartBottom}>
				<h1>
					<span className={style.totalPrice}>Total:</span> ${totalPrice}
				</h1>
				<button className={style.purchase} onClick={onPurchaseHandler}>
					Purchase
				</button>
			</section>
		</main>
	);
}
