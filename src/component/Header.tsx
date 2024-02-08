import { Cart, SearchIcon, User } from '../assets/icons';
import * as style from './Header.css';
import { Nav } from './Nav';

export function Header() {
	return (
		<header className={style.container}>
			<section className={style.headerTop}>
				<img src="/logo.png" alt="logo" className={style.logo} />

				<div className={style.search}>
					<form className={style.searchForm}>
						<input type="text" placeholder="Search" className={style.searchInput} />
						<button className={style.searchBtn}>
							<SearchIcon />
						</button>
					</form>
				</div>

				<div className={style.individual}>
					<div className={style.user}>
						<User />
					</div>
					<div className={style.cart}>
						<Cart />
					</div>
				</div>
			</section>

			<Nav />
		</header>
	);
}
