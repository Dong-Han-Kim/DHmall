import * as style from './App.css';
import { Header } from './component/Header';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<main className={style.container}>
			<Header />
			<Outlet />
		</main>
	);
}

export default App;
