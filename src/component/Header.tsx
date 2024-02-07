import * as style from './Header.css';

export function Header() {
	return (
		<main className={style.container}>
			<div>
				<img src="/logo.png" alt="logo" className={style.logo} />
			</div>
		</main>
	);
}
