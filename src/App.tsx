import * as style from './App.css';
import { Header } from './component/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';

function App() {
	return (
		<main className={style.container}>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="detail/:id" element={<Detail />} />
			</Routes>
			{/* <div className={style.main}>main contents</div> */}
		</main>
	);
}

export default App;
