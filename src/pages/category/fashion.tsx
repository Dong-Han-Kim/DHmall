import { useQuery } from '@tanstack/react-query';
import { Categories } from '../../component/Categories';
import * as style from './fashion.css';
import { getAllProduct, getSpecificCategory } from '../../services/api';
import { useState } from 'react';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface Product {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
}

type ClickEvent = MouseEvent<HTMLButtonElement>;

export default function Fashion() {
	const [clothes, setClothes] = useState('');
	let queryFetch = false;
	if (clothes !== '') {
		queryFetch = true;
	}

	const fashion = useQuery({
		queryKey: ['allProduct'],
		queryFn: getAllProduct,
	});

	const dtnFashion = useQuery({
		queryKey: ['specificCategory', clothes],
		queryFn: () => getSpecificCategory(clothes),
		enabled: queryFetch,
	});

	if (fashion.status === 'pending') {
		return <h1>Loading...</h1>;
	} else if (fashion.status === 'error') {
		return <h1>ERROR: {fashion.error.message}</h1>;
	} else if (!fashion.data) {
		return <h1>Loading...</h1>;
	}

	const fashionAll = fashion.data.allProduct;
	const fashionList = dtnFashion.data?.specificCategory;
	const items: object[] = [];
	console.log(items);
	console.log(clothes);

	const btnHandler = (e: ClickEvent) => {
		return setClothes(e.currentTarget.value);
	};
	console.log(fashionList);

	return (
		<>
			<div className={style.btnBox}>
				<button
					className={`${clothes === "/men's clothing" ? style.active : undefined} ${style.btn}`}
					value={"/men's clothing"}
					onClick={btnHandler}>
					Men's
				</button>
				<button
					className={`${clothes === "/women's clothing" ? style.active : undefined} ${style.btn}`}
					value={"/women's clothing"}
					onClick={btnHandler}>
					Woman's
				</button>
			</div>
			<div className={style.main}>
				<div className={style.container}>
					{clothes === ''
						? fashionAll
								.filter((product: Product) => {
									if (
										product.category === "men's clothing" ||
										product.category === "women's clothing"
									) {
										return items.push(product);
									}
								})
								.map((product: Product) => {
									return (
										<Link to={`detail/${product.id}`} className={style.product} key={product.id}>
											<div>
												<div className={style.imgBox}>
													<img
														src={product.image}
														alt="product image"
														className={style.productImg}
													/>
												</div>
												<div className={style.textBox}>
													<h2 className={style.productTitle}>{product.title}</h2>
													<h3 className={style.productPrice}>${product.price}</h3>
												</div>
											</div>
										</Link>
									);
								})
						: null}
					{clothes === "/men's clothing" &&
						fashionList?.map((product: Product) => {
							return (
								<Link to={`detail/${product.id}`} className={style.product} key={product.id}>
									<div>
										<div className={style.imgBox}>
											<img src={product.image} alt="product image" className={style.productImg} />
										</div>
										<div className={style.textBox}>
											<h2 className={style.productTitle}>{product.title}</h2>
											<h3 className={style.productPrice}>${product.price}</h3>
										</div>
									</div>
								</Link>
							);
						})}

					{clothes === "/women's clothing" &&
						fashionList?.map((product: Product) => {
							return (
								<Link to={`detail/${product.id}`} className={style.product} key={product.id}>
									<div>
										<div className={style.imgBox}>
											<img src={product.image} alt="product image" className={style.productImg} />
										</div>
										<div className={style.textBox}>
											<h2 className={style.productTitle}>{product.title}</h2>
											<h3 className={style.productPrice}>${product.price}</h3>
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
