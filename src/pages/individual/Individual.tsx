import { PurchaseCompleted } from '../../assets/icons';
import * as style from './Individual.css';

export default function Individual() {
	return (
		<main className={style.main}>
			<section className={style.title}>
				<PurchaseCompleted width={'100px'} height={'100px'} />
				<h1>Purchase Completed</h1>
			</section>
		</main>
	);
}
