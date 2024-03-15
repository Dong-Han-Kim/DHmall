import { Link } from 'react-router-dom';
import { Cart, SearchIcon, User } from '../assets/icons';
import * as style from './styles/Header.css';
import { Nav } from './Nav';
import { useCartContext } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

export function Header() {
	const { product } = useCartContext();
	const [current, setCurrent] = useState(product);
	const { user } = useAuthContext();

	useEffect(() => {
		setCurrent(product);
	}, [product]);

	return (
		<header className={style.container}>
			<section className={style.headerTop}>
				<Link to={'/'}>
					<img src="/logo.png" alt="logo" className={style.logo} />
				</Link>

				<div className={style.search}>
					<form className={style.searchForm}>
						<input type="text" placeholder="Search" className={style.searchInput} />
						<button className={style.searchBtn}>
							<SearchIcon />
						</button>
					</form>
				</div>

				<div className={style.individual}>
					{!user ? (
						<Link to={'/login'}>
							<div className={style.user}>
								<User />
							</div>
						</Link>
					) : (
						<Link to={'/individual'}>
							<div className={style.user}>
								<User />
							</div>
						</Link>
					)}

					<div className={style.cart}>
						<Link to={'/cart'}>
							<Cart />
							{current.length === 0 ? null : <div className={style.cartLength}>{current.length}</div>}
						</Link>
					</div>
				</div>
			</section>

			<Nav />
		</header>
	);
}
