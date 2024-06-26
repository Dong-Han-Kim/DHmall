import { useSuspenseQuery } from '@tanstack/react-query';
import { getSpecificCategory } from '../../services/api';
import * as style from './Categories.css';
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
	const category = location.pathname.slice(7);

	console.log(category);

	const { data, isError, error } = useSuspenseQuery({
		queryKey: ['specificCategory', category],
		queryFn: () => getSpecificCategory(category),
	});

	if (isError) {
		return <h1>ERROR: {error.message}</h1>;
	}
	const products = data.specificCategory;

	return (
		<main className={style.main}>
			<div className={style.container}>
				{products.map((product: Product) => {
					return (
						<Link to={`/DHmall/detail/${product.id}`} className={style.product} key={product.id}>
							<div>
								<div className={style.imgBox}>
									<img src={product.image} alt="product image" className={style.productImg} />
								</div>
								<div className={style.textBox}>
									<div className={style.titleDiv}>
										<h2 className={style.productTitle}>{product.title}</h2>
									</div>
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
