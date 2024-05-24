import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../services/api';
import * as style from './Detail.css';
import { useState } from 'react';
import { useCartContext } from '../../context/useCartContext';
import Loading from '../../component/Loading';

interface Product {
	id: number;
	title: string;
	category: string;
	amount: number;
	description: string;
	image: string;
	price: number;
}

export default function Detail() {
	const { id } = useParams() as { id: string };
	const { product, setProduct } = useCartContext();
	const [amount, setAmount] = useState<number>(1);
	const key = 'CartItem';
	console.log(product);

	const { data, isError, error, isLoading } = useQuery({
		queryKey: ['singleProduct', id],
		queryFn: () => getSingleProduct(id),
	});

	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return <h1>ERROR: {error.message}</h1>;
	}

	const productDetail = data?.singleProduct;
	const isAlreadyInCart = product.findIndex((item: Product) => item?.id === productDetail?.id) !== -1;
	console.log(isAlreadyInCart);

	const item: Product = {
		...productDetail,
		amount: amount,
	};

	function addTocartHandler() {
		const storageList = localStorage.getItem(key);
		if (storageList) {
			const currentCart = JSON.parse(storageList);
			if (!isAlreadyInCart) {
				const update = [...currentCart, item];
				localStorage.setItem(key, JSON.stringify(update));
				setProduct(update);
			} else {
				const update = currentCart.map((item: Product) => {
					if (item.id === productDetail.id) {
						return { ...item, amount: item.amount + amount };
					}
					return item;
				});
				localStorage.setItem(key, JSON.stringify(update));
				setProduct(update);
			}
		} else {
			localStorage.setItem(key, JSON.stringify([item]));
			setProduct([item]);
		}
	}

	const decrease = () => {
		if (amount > 1) {
			setAmount(amount - 1);
		}
	};

	const increase = () => {
		setAmount(amount + 1);
	};

	return (
		<>
			<section className={style.top}>
				<div className={style.imgBox}>
					<img src={productDetail.image} alt="product image" className={style.img} />
				</div>
				<div className={style.info}>
					<h1 className={style.title}>{productDetail.title}</h1>
					<h3 className={style.price}>${Math.floor(productDetail.price)}</h3>
					<div className={style.form}>
						<button className={style.button} onClick={decrease}>
							-
						</button>
						<div className={style.input_box}>
							<input
								className={style.count}
								type="number"
								name="amount"
								placeholder="1"
								min={1}
								value={amount}
								readOnly
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setAmount(Number(e.target.value));
								}}
							/>
						</div>
						<button className={style.button} onClick={increase}>
							+
						</button>
					</div>

					<Link to={'/DHmall/cart'} className={style.goToCart}>
						<button className={style.addToCart} onClick={addTocartHandler}>
							Add to Cart
						</button>
					</Link>
				</div>
			</section>
			<hr className={style.division} />
			<section className={style.bottom}>
				<h1 className={style.description}>Description</h1>
				<p>{productDetail.description}</p>
			</section>
		</>
	);
}
