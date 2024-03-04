import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../services/api';
import * as style from './Detail.css';
import { useEffect, useState } from 'react';

interface Product {
	id: number;
	title: string;
	category: string;
	amount: number;
	description: string;
	children?: Product[] | undefined;
}

export default function Detail() {
	const { id } = useParams() as { id: string };
	const [select, setSelect] = useState<Product[]>([]);
	const [amount, setAmount] = useState<number>(1);

	useEffect(() => {
		const products = JSON.parse(localStorage.getItem('CartItem'));
		if (!products || products.length === 0) return;
		setSelect(products);
	}, []);

	const detailFetch = useQuery({
		queryKey: ['singleProduct', id],
		queryFn: () => getSingleProduct(id),
	});

	if (detailFetch.status === 'pending') {
		return <h1>Loading...</h1>;
	} else if (detailFetch.status === 'error') {
		return <h1>ERROR: {detailFetch.error.message}</h1>;
	}
	const detailData = detailFetch.data.singleProduct;

	const selectItem: Product = {
		...detailData,
		amount: amount,
	};
	const productArr = [...select, selectItem];

	function addTocartHandler() {
		localStorage.setItem('CartItem', JSON.stringify(productArr));
		setSelect(productArr);
	}
	return (
		<>
			<section className={style.top}>
				<div className={style.imgBox}>
					<img src={detailData.image} alt="product image" className={style.img} />
				</div>
				<div className={style.info}>
					<h1 className={style.title}>{detailData.title}</h1>
					<h3 className={style.price}>${detailData.price}</h3>
					<input
						className={style.count}
						type="number"
						name="amount"
						placeholder="1"
						min={1}
						value={amount}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setAmount(Number(e.target.value));
						}}
					/>
					<Link to={'/cart'} className={style.goToCart}>
						<button className={style.addToCart} onClick={addTocartHandler}>
							Add to Cart
						</button>
					</Link>
				</div>
			</section>
			<hr className={style.division} />
			<section className={style.bottom}>
				<p>{detailData.description}</p>
			</section>
		</>
	);
}
