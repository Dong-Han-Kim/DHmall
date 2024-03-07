import { useQuery } from '@tanstack/react-query';
import { getSpecificCategory } from '../services/api';
import * as style from './styles/Categories.css';
import { Link, useLocation } from 'react-router-dom';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
}

export function Categories() {
	const location = useLocation();
	const category = location.pathname;

	const specific = useQuery({
		queryKey: ['specificCategory', category],
		queryFn: () => getSpecificCategory(category),
	});

	if (specific.status === 'pending') {
		return <h1>Loading...</h1>;
	} else if (specific.status === 'error') {
		return <h1>ERROR: {specific.error.message}</h1>;
	}
	const products = specific.data.specificCategory;

	return (
		<main className={style.main}>
			<div className={style.container}>
				{products.map((product: Product) => {
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
				})}
			</div>
		</main>
	);
}
