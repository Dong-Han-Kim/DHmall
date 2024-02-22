import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../services/api';
import * as style from './Detail.css';
import { useState } from 'react';

export default function Detail() {
	const { id } = useParams() as { id: string };
	const [amount, setAmount] = useState<number>(1);
	const detailFetch = useQuery({
		queryKey: ['singleProduct', id],
		queryFn: () => getSingleProduct(id),
	});

	console.log(id);
	console.dir(id);

	if (detailFetch.status === 'pending') {
		return <h1>Loading...</h1>;
	} else if (detailFetch.status === 'error') {
		return <h1>ERROR: {detailFetch.error.message}</h1>;
	}

	const detailData = detailFetch.data.singleProduct;
	const selectItem = {
		...detailData,
		amount: amount,
	};

	console.log(selectItem);

	function addTocartHandler() {
		localStorage.setItem(selectItem.id, JSON.stringify(selectItem));
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
