import { useSuspenseQuery } from '@tanstack/react-query';
import { Categories } from './Categories';
import * as style from './fashion.css';
import { getAllProduct } from '../../services/api';
import { Link } from 'react-router-dom';

interface Product {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
}

export default function Fashion() {
	const { data, isError, error } = useSuspenseQuery({
		queryKey: ['allProduct'],
		queryFn: getAllProduct,
	});

	if (isError) {
		return <h1>ERROR: {error.message}</h1>;
	}

	const fashionAll = data.allProduct;
	const items: object[] = [];

	return (
		<>
			<div className={style.main}>
				<div className={style.container}>
					{fashionAll
						.filter((product: Product) => {
							if (product.category === "men's clothing" || product.category === "women's clothing") {
								return items.push(product);
							}
						})
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
						})}
				</div>
			</div>

			<Categories />
		</>
	);
}
