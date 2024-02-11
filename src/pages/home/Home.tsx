import * as style from './Home.css';
import { MainItems } from '../../component/MainItems';
import { Slider } from '../../component/Slider';
import { useParams } from 'react-router-dom';

export default function Home() {
	const params = useParams();

	console.log(params);

	return (
		<main className={style.main}>
			<div className={style.container}>
				<Slider />
				<div className={style.productsBox}>
					<h1 className={style.title}>Electronics</h1>
					<MainItems category={'/electronics'} count={4} />
				</div>

				<div className={style.productsBox}>
					<h1 className={style.title}>Fashion</h1>
					<MainItems category={"/men's clothing"} count={4} />
				</div>

				<div className={style.productsBox}>
					<h1 className={style.title}>Jewelry</h1>
					<MainItems category={'/jewelery'} count={4} />
				</div>
			</div>
		</main>
	);
}
