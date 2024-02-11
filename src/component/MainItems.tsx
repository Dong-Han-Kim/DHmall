import { useQuery } from '@tanstack/react-query';
import { getLimitResults } from '../services/api';
import * as style from './MainItems.css';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
}

export function MainItems({ category, count }: { category: string; count: number }) {
	const limitCategory = useQuery({
		queryKey: ['limitResults', category, count],
		queryFn: () => getLimitResults(category, count),
	});

	if (limitCategory.status === 'pending') {
		return <h1>Loading...</h1>;
	} else if (limitCategory.status === 'error') {
		return <h1>ERROR: {limitCategory.error.message}</h1>;
	}
	const products = limitCategory.data.limitResults;

	return (
		<main className={style.main}>
			<div className={style.container}>
				{products
					.map((product: Product) => {
						return (
							<div className={style.product} key={product.id}>
								<div className={style.imgBox}>
									<img src={product.image} alt="product image" className={style.productImg} />
								</div>
								<div className={style.textBox}>
									<h2 className={style.productTitle}>{product.title}</h2>
									<h3 className={style.productPrice}>${product.price}</h3>
								</div>
							</div>
						);
					})
					.slice(0, 4)}
			</div>
		</main>
	);
}
