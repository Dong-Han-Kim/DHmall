import * as style from './App.css';
import { Header } from './component/Header';

function App() {
	return (
		<main className={style.container}>
			<div>
				<Header />
			</div>
			<div className={style.main}>main contents</div>
		</main>
	);
}

export default App;
