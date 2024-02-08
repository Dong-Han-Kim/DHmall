import { useQuery } from '@tanstack/react-query';
import * as style from './Home.css';
import { getAllProduct } from '../../services/api';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}

export default function Home() {
	const products = useQuery({
		queryKey: ['allProduct'],
		queryFn: getAllProduct,
	});

	console.log(products);
	if (products.status === 'pending') {
		return <h1>Loading...</h1>;
	} else if (products.status === 'error') {
		return <h1>ERROR: {products.error.message}</h1>;
	}

	const getProduct = products.data.allProduct;

	return (
		<main className={style.main}>
			<div className={style.container}>
				{getProduct.map((product: Product) => {
					return (
						<div className={style.product}>
							<div className={style.imgBox}>
								<img src={product.image} alt="product image" className={style.productImg} />
							</div>
							<div className={style.textBox}>
								<h2 className={style.productTitle}>{product.title}</h2>
								<h3 className={style.productPrice}>${product.price}</h3>
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
}
