import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/api';
import * as style from './Nav.css';

export function Nav() {
	const allCategoreisList = useQuery({
		queryKey: ['allCategoreis'],
		queryFn: getAllCategories,
	});

	if (allCategoreisList.status === 'pending') {
		return <h1>Loading...</h1>;
	} else if (allCategoreisList.status === 'error') {
		return <h1>Error: {allCategoreisList.error.message}</h1>;
	}

	console.log(allCategoreisList);
	const category = allCategoreisList.data.allCategoreis;

	return (
		<div className={style.container}>
			<ul className={style.nav}>
				{category.map((cat: string) => {
					return <li className={style.navItem}>{cat}</li>;
				})}
			</ul>
		</div>
	);
}
