import * as style from './styles/CartInList.css';
import { Trash } from '../assets/icons';
import { useEffect, useState } from 'react';
import { useCartContext } from '../context/useCartContext';
import { useNavigate } from 'react-router-dom';
import AmountForm from './AmountForm';

interface Product {
	id: number;
	title: string;
	category: string;
	amount: number;
	description: string;
	image: string;
	price: number;
}

export default function CartInList() {
	const { product, setProduct } = useCartContext();
	const [totalPrice, setTotalPrice] = useState(0);
	const key = 'CartItem';
	const navigate = useNavigate();
	console.log(product);

	// 상품의 총 가격
	useEffect(() => {
		const result = product.reduce(
			(sum: number, current: Product) => sum + Math.floor(current?.price) * current?.amount,
			0
		);
		setTotalPrice(result);
	}, [product]);

	// 기본 구매 버튼 이벤트
	async function onPurchaseHandler() {
		if (product.length !== 0) {
			alert('You have completed your purchase.');
			localStorage.removeItem(key);
			setProduct([]);
			navigate('/DHmall');
		} else {
			alert('Your shopping cart is empty.');
		}
	}

	// product 삭제
	function deleteProduct(id: number) {
		const newProductArr = product.filter((item: Product) => item.id !== id);
		localStorage.setItem(key, newProductArr);
		setProduct(newProductArr);
	}

	return (
		<>
			<section>
				{product.length !== 0
					? product?.map((item: Product) => {
							return (
								<div key={item.id}>
									<div className={style.productList}>
										<div className={`${style.productInfo} ${style.product}`}>
											<img className={style.productImg} src={item?.image} alt="product image" />
											<h4 className={style.productTitle}>{item?.title}</h4>
										</div>
										<div className={style.productAmount}>
											<AmountForm id={item?.id} amount={item?.amount} />
										</div>
										<span className={style.productPrice}>
											${Math.floor(item?.price) * item?.amount}
										</span>
										<button className={style.productDelete} onClick={() => deleteProduct(item?.id)}>
											<Trash />
										</button>
									</div>
									<hr />
								</div>
							);
					  })
					: null}
			</section>
			<section className={style.cartBottom}>
				<h1>
					<span className={style.totalPrice}>Total:</span> ${totalPrice}
				</h1>
				<button className={style.purchase} onClick={onPurchaseHandler}>
					Purchase
				</button>
			</section>
		</>
	);
}
