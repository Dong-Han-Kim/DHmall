import * as style from './styles/CartInList.css';
import { Trash } from '../assets/icons';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';
import { useCartContext } from '../context/useCartContext';
import { useNavigate } from 'react-router-dom';
import AmountForm from './AmountForm';
import { DocumentData, deleteDoc, deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
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

interface HistoryProduct {
	id: string;
	products: Product[];
	date: string;
}

export default function CartInList() {
	const [totalPrice, setTotalPrice] = useState(0);
	const [userCart, setUseCart] = useState<DocumentData>([]);
	const { user } = useAuthContext();
	const { product, setProduct } = useCartContext();
	const priceArr: number[] = [];
	const key = 'CartItem';
	const navigate = useNavigate();
	const productInCart = {
		id: user.user_id,
		products: product,
	};

	const getProductDate = async () => {
		try {
			const data = user && (await getDoc(doc(db, 'cart', user.user_id)));
			const userCartData = data && data.data();
			setUseCart(userCartData?.products || []);
			console.log(userCartData);
		} catch (error) {
			console.error('getProductDate Error: ', error);
		}
	};

	// product 삭제
	function deleteProduct(id: number) {
		const newProductArr = product.filter((item: Product) => item.id !== id);
		localStorage.setItem(key, JSON.stringify(newProductArr));
		setProduct(newProductArr);
	}

	// 구매 버튼 이벤트
	async function onPurchaseHandler() {
		const date = new Date();
		const today = `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;
		const historyProducts: HistoryProduct = {
			id: user.user_id,
			products: product,
			date: today,
		};

		try {
			if (product.length !== 0) {
				alert('You have completed your purchase.');
				localStorage.removeItem(key);
				setProduct([]);
				navigate('/');
			} else {
				alert('Your shopping cart is empty.');
			}
			if (user.loggedState) {
				await setDoc(doc(db, 'history', user.user_id), historyProducts);
				await deleteDoc(doc(db, 'cart', user.user_id));
				await updateDoc(doc(db, 'cart', user.user_id), {
					cartProduct: deleteField(),
				});
			}
		} catch (error) {
			console.error('onPurchaseHandler Error: ', error);
		}
	}

	useEffect(() => {
		const result = priceArr.reduce((sum, current) => sum + current, 0);
		setTotalPrice(result);
	}, [priceArr]);

	if (user.loggedState) {
		const productUpdate = user && doc(db, 'cart', user.user_id);
		const cartDocUpdate = async () => {
			try {
				await updateDoc(productUpdate, {
					...productInCart,
					products: product ? product : null,
				});
			} catch (error) {
				console.error('cartDocUpdate Error: ', error);
			}
		};

		const cartInUser = async () => {
			try {
				await setDoc(doc(db, 'cart', user.user_id), productInCart);
			} catch (error) {
				console.error('cartInUser Error: ', error);
			}
		};
		cartInUser();
		cartDocUpdate();
		getProductDate();
	}

	console.log(user);

	return (
		<>
			<section>
				{!user.loggedState
					? product.map((item: Product) => {
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
										<span className={style.productPrice}>
											${Math.floor(item.price) * item.amount}
										</span>
										<button className={style.productDelete} onClick={() => deleteProduct(item.id)}>
											<Trash />
										</button>
									</div>
									<hr />
								</div>
							);
					  })
					: userCart.map((item: Product) => {
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
										<span className={style.productPrice}>
											${Math.floor(item.price) * item.amount}
										</span>
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
