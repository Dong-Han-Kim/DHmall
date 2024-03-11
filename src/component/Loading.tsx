import LoadingSrc from '../assets/loading.gif';
import { loadingContainer } from './styles/Loading.css';

export default function Loading() {
	return (
		<div className={loadingContainer}>
			<img src={LoadingSrc} alt="loading" />
		</div>
	);
}
