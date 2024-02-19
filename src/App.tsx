import * as style from './App.css';
import { Header } from './component/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import Electronics from './pages/category/electronics';
import Fashion from './pages/category/fashion';
import Jewelery from './pages/category/jewelery';

function App() {
	return (
		<main className={style.container}>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/electronics" element={<Electronics />} />
				<Route path="/electronics/detail/:id" element={<Detail />} />
				<Route path="/fashion" element={<Fashion />} />
				<Route path="/fashion/detail/:id" element={<Detail />} />
				<Route path="/jewelery" element={<Jewelery />} />
				<Route path="/jewelery/detail/:id" element={<Detail />} />
				<Route path="detail/:id" element={<Detail />} />
			</Routes>
		</main>
	);
}

export default App;
