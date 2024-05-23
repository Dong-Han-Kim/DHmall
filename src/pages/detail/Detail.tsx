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
	const detailFetch = useQuery({
		queryKey: ['singleProduct', id],
		queryFn: () => getSingleProduct(id),
	});

	if (detailFetch.status === 'pending') {
		return <Loading />;
	} else if (detailFetch.status === 'error') {
		return <h1>ERROR: {detailFetch.error.message}</h1>;
	}

	const productDetail = detailFetch?.data.singleProduct;
	const isAlreadyInCart = product.findIndex((item: Product) => item?.id === productDetail?.id) !== -1;

	const selectItem: Product = {
		...productDetail,
		amount: amount,
	};

	function addTocartHandler() {
		if (!isAlreadyInCart) {
			setProduct([...product, selectItem]);
		} else if (isAlreadyInCart) {
			const update = product.map((item: Product) => {
				if (item.id === productDetail.id) {
					setAmount((prev) => prev + amount);
					return { ...item, amount: item.amount + amount };
				}
			});
			setProduct(update);
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
