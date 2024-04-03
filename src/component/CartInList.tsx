import * as style from './styles/CartInList.css';
import { Trash } from '../assets/icons';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { useCartContext } from '../context/useCartContext';
import { useNavigate } from 'react-router-dom';
import AmountForm from './AmountForm';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

interface History {
	date: string;
	products: Product[];
}

interface HistoryDoc {
	id: string;
	history: History[];
}

export default function CartInList() {
	const { product, setProduct } = useCartContext();
	const { user } = useAuthContext();
	const [totalPrice, setTotalPrice] = useState(0);
	const [historyDoc, setHistoryDoc] = useState<HistoryDoc>();
	const priceArr: number[] = [];
	const key = 'CartItem';
	const USER_ID = localStorage.getItem('userUid');
	const navigate = useNavigate();
	const date = new Date();
	const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

	// 상품의 총 가격
	useEffect(() => {
		const result = priceArr.reduce((sum, current) => sum + current, 0);
		setTotalPrice(result);
	}, [priceArr]);

	useEffect(() => {
		if (user) {
			const getHistory = async () => {
				const docRef = doc(db, 'history', USER_ID);
				const docSnap = await getDoc(docRef);
				const data = docSnap.data();
				console.log(data.userHistory);
				setHistoryDoc(data.userHistory);
			};
			getHistory();
		}
	}, [user, USER_ID]);

	// 기본 구매 버튼 이벤트
	async function onPurchaseHandler() {
		if (product.length !== 0) {
			alert('You have completed your purchase.');
			const updateHistory = historyDoc.history.filter((item) => item.date === today);

			if (user) {
				const updateCart = async () => {
					const docRef = doc(db, 'history', USER_ID);
					await updateDoc(docRef, {
						...historyDoc,
						history: [
							{
								...history,
								products: [...updateHistory[0].products, product],
							},
						],
					});
				};
				updateCart();
			}
			localStorage.removeItem(key);
			setProduct([]);
			navigate('/');
		} else {
			alert('Your shopping cart is empty.');
		}
	}

	// product 삭제
	function deleteProduct(id: number) {
		const newProductArr = product.filter((item: Product) => item.id !== id);
		localStorage.setItem(key, JSON.stringify(newProductArr));
		setProduct(newProductArr);
	}

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
