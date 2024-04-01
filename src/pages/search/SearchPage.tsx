import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getAllProduct } from '../../services/api';
import Loading from '../../component/Loading';
import * as style from './SearchPage.css';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
}

export default function SearchPage() {
	const { searchItem } = useParams();
	const getProduct = useQuery({
		queryKey: ['allProduct'],
		queryFn: getAllProduct,
	});

	if (getProduct.status === 'pending') {
		return <Loading />;
	} else if (getProduct.status === 'error') {
		return <h1>Error: {getProduct.error.message}</h1>;
	}

	console.log(searchItem);
	console.log(getProduct);
	const productList = getProduct.data.allProduct;
	const results = productList.filter((product: Product) => product.title.toLowerCase().includes(searchItem));

	return (
		<main className={style.main}>
			{results.map((product: Product) => {
				return (
					<div key={product.id}>
						<Link to={`/detail/${product.id}`}>
							<div className={style.product__box}>
								<img src={product.image} alt="product image" className={style.product__img} />
								<p className={style.product__title}>{product.title}</p>
								<p className={style.product__price}>${product.price}</p>
							</div>
						</Link>
					</div>
				);
			})}
		</main>
	);
}
