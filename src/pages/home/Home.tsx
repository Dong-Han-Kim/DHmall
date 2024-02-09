import * as style from './Home.css';
import { MainItems } from '../../component/MainItems';

export default function Home() {
	return (
		<main className={style.main}>
			<div className={style.container}>
				<div className={style.productsBox}>
					<h1 className={style.title}>Electronics</h1>
					<MainItems category={'electronics'} />
				</div>

				<div className={style.productsBox}>
					<h1 className={style.title}>Fashion</h1>
					<MainItems category={"men's clothing"} />
				</div>

				<div className={style.productsBox}>
					<h1 className={style.title}>Jewelry</h1>
					<MainItems category={'jewelery'} />
				</div>
			</div>
		</main>
	);
}
