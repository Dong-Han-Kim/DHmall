import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../services/api';
import * as style from './/Detail.css';

export default function Detail() {
	const { id } = useParams() as { id: string };

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

	return (
		<>
			<section className={style.top}>
				<div className={style.imgBox}>
					<img src={detailData.image} alt="product image" className={style.img} />
				</div>
				<div className={style.info}>
					<h1>{detailData.title}</h1>
					<h3 className={style.price}>${detailData.price}</h3>
					<input className={style.count} type="number" min={1} />
					<button className={style.addToCart}>Add to Cart</button>
				</div>
			</section>
			<hr className={style.division} />
			<section className={style.bottom}>
				<p>{detailData.description}</p>
			</section>
		</>
	);
}
