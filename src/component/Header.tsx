import { Link } from 'react-router-dom';
import { Cart, User } from '../assets/icons';
import * as style from './styles/Header.css';
import { Nav } from './Nav';
import { useCartContext } from '../context/useCartContext';
import { useAuthContext } from '../context/useAuthContext';
import Search from './Search';

export function Header() {
	const { product } = useCartContext();
	const { user } = useAuthContext();

	return (
		<header className={style.container}>
			<section className={style.headerTop}>
				<Link to={'/'}>
					<img src="/logo.png" alt="logo" className={style.logo} />
				</Link>

				<div className={style.search}>
					<Search />
				</div>

				<div className={style.individual}>
					<Link to={!user ? '/login' : '/individual'}>
						<div className={style.user}>
							<User />
						</div>
					</Link>

					<div className={style.cart}>
						<Link to={'/cart'}>
							<Cart />
							{product.length === 0 ? null : <div className={style.cartLength}>{product.length}</div>}
						</Link>
					</div>
				</div>
			</section>

			<Nav />
		</header>
	);
}
