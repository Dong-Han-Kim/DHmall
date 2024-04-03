import * as style from './Cart.css';
import NoProduct from '../../component/NoProduct';
import CartInList from '../../component/CartInList';
import { useCartContext } from '../../context/useCartContext';

export default function Cart() {
	const { product } = useCartContext();

	return (
		<main className={style.main}>
			<section>
				<div className={style.productInfoBox}>
					<span className={style.productInfo}>Product</span>
					<span className={style.productAmount}>Amount</span>
					<span className={style.productPrice}>Price</span>
					<span className={style.productDelete}>Delete</span>
				</div>
				<hr />
				{product.length === 0 ? <NoProduct /> : <CartInList />}
			</section>
		</main>
	);
}
