import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Categories } from './component/Categories';
import Detail from './pages/detail/Detail.tsx';
import Fashion from './pages/category/fashion.tsx';
import Cart from './pages/cart/cart.tsx';
import Home from './pages/home/Home.tsx';
import CartContextProvider from './context/CartContext.tsx';
import SearchPage from './pages/search/SearchPage.tsx';
import RQProvider from './component/RQProvider.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: '/:category', element: <Categories /> },
			{ path: '/:category/detail/:id', element: <Detail /> },
			{ path: '/fashion', element: <Fashion /> },
			{ path: '/fashion/detail/:id', element: <Detail /> },
			{ path: 'detail/:id', element: <Detail /> },
			{ path: '/cart', element: <Cart /> },
			{ path: '/search/:searchItem', element: <SearchPage /> },
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
