import * as style from './styles/CartInList.css';
import { Trash } from '../assets/icons';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { useCartContext } from '../context/useCartContext';
import { useNavigate } from 'react-router-dom';
import AmountForm from './AmountForm';
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

// database 구조
// uid = [{
// id: number;
// title: string;
// category: string;
// amount: number;
// description: string;
// image: string;
// price: number
// }];

export default function CartInList() {
	const { product, setProduct } = useCartContext();
	const { user } = useAuthContext();
	const [totalPrice, setTotalPrice] = useState(0);
	const [historyList, setHistoryList] = useState<Product[]>();
	const priceArr: number[] = [];
	const key = 'CartItem';
	const navigate = useNavigate();
	const date = new Date();
	const today = `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;

	// 상품의 총 가격
	useEffect(() => {
		const result = priceArr.reduce((sum, current) => sum + current, 0);
		setTotalPrice(result);
	}, [priceArr]);

	// 기본 구매 버튼 이벤트
	async function onPurchaseHandler() {
		if (product.length !== 0) {
			alert('You have completed your purchase.');
			localStorage.removeItem(key);
			setProduct([]);
			navigate('/');
		} else {
			alert('Your shopping cart is empty.');
		}
		if (user.loggedState) {
			historyFn();
		}
	}

	// product 삭제
	function deleteProduct(id: number) {
		const newProductArr = product.filter((item: Product) => item.id !== id);
		localStorage.setItem(key, JSON.stringify(newProductArr));
		setProduct(newProductArr);
	}

	const historyFn = async () => {
		const docRef = doc(db, 'history', today);
		const historyStorage = await getDoc(docRef);
		const history = {
			date: today,
			id: user.userId,
			products: product,
		};
		if (!historyStorage) {
			await setDoc(docRef, history);
		} else {
			const userHistory = historyStorage.data();
			setHistoryList((prev) => [...prev, userHistory.product]);
		}
		const newHistory = {
			...history,
			products: historyList,
		};
		await updateDoc(docRef, newHistory);
	};

	return (
		<>
			<section>
				{product.map((item: Product) => {
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
				})}
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
