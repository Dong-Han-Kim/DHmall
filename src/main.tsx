import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Categories } from './component/Categories';
import Detail from './pages/detail/Detail.tsx';
import Fashion from './pages/category/fashion.tsx';
import Cart from './pages/cart/Cart.tsx';
import Home from './pages/home/Home.tsx';
import CartContextProvider from './context/CartContext.tsx';
import Login from './pages/login/Login.tsx';
import Individual from './pages/individual/Individual.tsx';

const queryClient = new QueryClient();

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
			{ path: '/login', element: <Login /> },
			{ path: '/individual', element: <Individual /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={true} />
			<CartContextProvider>
				<RouterProvider router={router} />
			</CartContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
