import { NavLink } from 'react-router-dom';
import * as style from './styles/Nav.css';

export function Nav() {
	return (
		<div className={style.container}>
			<ul className={style.nav}>
				<NavLink to={'electronics'} className={({ isActive }) => (isActive ? style.active : undefined)}>
					<li className={style.navItem}>Electronics</li>
				</NavLink>
				<NavLink to={'fashion'} className={({ isActive }) => (isActive ? style.active : undefined)}>
					<li className={style.navItem}>Fashion</li>
				</NavLink>
				<NavLink to={'jewelery'} className={({ isActive }) => (isActive ? style.active : undefined)}>
					<li className={style.navItem}>Jewelry</li>
				</NavLink>
			</ul>
		</div>
	);
}
