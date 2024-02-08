import * as style from './App.css';
import { Header } from './component/Header';

function App() {
	return (
		<main className={style.container}>
			<Header />
			<div className={style.main}>main contents</div>
		</main>
	);
}

export default App;
