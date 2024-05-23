import { Link } from 'react-router-dom';
import { Cart } from '../assets/icons';
import * as style from './styles/Header.css';
import { Nav } from './Nav';
import { useCartContext } from '../context/useCartContext';
import Search from './Search';

export function Header() {
	const { product } = useCartContext();

	return (
		<header className={style.container}>
			<section className={style.headerTop}>
				<Link to={'/DHmall/'}>
					<img src="/DHmall/logo.png" alt="logo" className={style.logo} />
				</Link>

				<div className={style.search}>
					<Search />
				</div>

				<div className={style.cart}>
					<Link to={'/DHmall/cart'} className={style.cartLink}>
						<Cart />
						{product.length === 0 ? null : <div className={style.cartLength}>{product.length}</div>}
					</Link>
				</div>
			</section>

			<Nav />
		</header>
	);
}
