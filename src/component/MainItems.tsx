import { useQuery } from '@tanstack/react-query';
import { getSpecificCategory } from '../services/api';
import * as style from './styles/MainItems.css';
import { Link } from 'react-router-dom';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
}

export function MainItems({ category }: { category: string }) {
	const limitCategory = useQuery({
		queryKey: ['specificCategory', category],
		queryFn: () => getSpecificCategory(category),
	});

	if (limitCategory.status === 'pending') {
		return <h1>Loading...</h1>;
	} else if (limitCategory.status === 'error') {
		return <h1>ERROR: {limitCategory.error.message}</h1>;
	}
	const products = limitCategory.data.specificCategory;

	return (
		<main className={style.main}>
			<div className={style.container}>
				{products
					.map((product: Product) => {
						return (
							<Link to={`detail/${product.id}`} className={style.product} key={product.id}>
								<div>
									<div className={style.imgBox}>
										<img src={product.image} alt="product image" className={style.productImg} />
									</div>
									<div className={style.textBox}>
										<h2 className={style.productTitle}>{product.title}</h2>
										<h3 className={style.productPrice}>${Math.floor(product.price)}</h3>
									</div>
								</div>
							</Link>
						);
					})
					.slice(0, 4)}
			</div>
		</main>
	);
}
