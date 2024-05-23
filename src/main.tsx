import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Categories } from './pages/category/Categories.tsx';
import Detail from './pages/detail/Detail.tsx';
import Fashion from './pages/category/fashion.tsx';
import Cart from './pages/cart/cart.tsx';
import Home from './pages/home/Home.tsx';
import CartContextProvider from './context/CartContext.tsx';
import SearchPage from './pages/search/SearchPage.tsx';
import RQProvider from './component/RQProvider.tsx';

const router = createBrowserRouter([
	{
		path: '/DHmall/',
		element: <App />,
		children: [
			{ path: '/DHmall/', element: <Home /> },
			{ path: '/DHmall/:category', element: <Categories /> },
			{ path: '/DHmall/:category/detail/:id', element: <Detail /> },
			{ path: '/DHmall/fashion', element: <Fashion /> },
			{ path: '/DHmall/fashion/detail/:id', element: <Detail /> },
			{ path: '/DHmall/detail/:id', element: <Detail /> },
			{ path: '/DHmall/cart', element: <Cart /> },
			{ path: '/DHmall/search/:searchItem', element: <SearchPage /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RQProvider>
			<CartContextProvider>
				<RouterProvider router={router} />
			</CartContextProvider>
		</RQProvider>
	</React.StrictMode>
);
