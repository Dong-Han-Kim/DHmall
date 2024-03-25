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

// interface HistoryProduct {
// 	id: string | null;
// 	date: string | null;
// 	products: Product[] | null;
// }

export default function CartInList() {
	const [totalPrice, setTotalPrice] = useState(0);
	const [userCart, setUserCart] = useState([]);
	const priceArr: number[] = [];
	const key = 'CartItem';
	const userUid = localStorage.getItem('userUid');
	const navigate = useNavigate();
	const date = new Date();
	const today = `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;

	//////////////////////////////////////////////////////////////////////////
	// 1. product를 가져온다.
	// 로그인을 안했을 때
	// 그냥 기존 product를 가져온다.
	const { product, setProduct } = useCartContext();

	// 로그인을 했을 때
	const { user } = useAuthContext();
	// 유저의 카트를 가져온다
	useEffect(() => {
		if (user) {
			const cartData = async () => {
				const docRef = doc(db, 'cart', userUid);
				const cartStorage = await getDoc(docRef);
				console.log(cartStorage.data());
				if (!cartStorage) {
					return;
				} else {
					// 카트에 product가 들어있으면 그 product를 map으로 돌린다.
					const data = cartStorage.data();
					setUserCart(data.product);
					console.log(data);
				}

				// 로그인 전에 카트에 들어있는 아이템이 있으면 유저의 카트에 추가한다.
				if (product.length > 0) {
					const data = cartStorage.data();
					setUserCart((prev) => [data.product, ...prev]);
				}
			};
			cartData();
		}
	}, [user, userUid]);

	// 그리고 카트의 아이템을 가져와서 map을 돌린다.
	setProduct(userCart);

	/////////////////////////////////////////////////////////////////////////

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

	useEffect(() => {
		const upDateUserProducts = [...userCart, product];
		if (user && user.loggedState) {
			const cartDocUpdate = async () => {
				await updateDoc(doc(db, 'cart', userUid), {
					upDateUserProducts,
				});
			};
			cartDocUpdate();
		}
	}, [product, user, userCart]);

	const historyFn = async () => {
		const docRef = doc(db, 'history', today);
		const historyStorage = await getDoc(docRef);
		const historyItem = historyStorage.data();
		if (historyItem.date !== today) {
			const history = {
				date: today,
				id: user.userId,
				products: product,
			};
			await setDoc(doc(db, 'history', today), {
				history,
			});
		} else if (historyItem.date === today) {
			const history = {
				...historyItem,
				products: [...historyItem.products, product],
			};
			await updateDoc(doc(db, 'history', today), {
				history,
			});
		}
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
