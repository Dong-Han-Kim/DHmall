import * as style from './styles/NoProduct.css';

export default function NoProduct() {
	return (
		<>
			<div className={style.noProduct}>
				<h1>There are no products in your cart.</h1>
			</div>
			<hr />
		</>
	);
}
