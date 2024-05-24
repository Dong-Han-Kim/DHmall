import { Link } from 'react-router-dom';
import { SearchIcon } from '../assets/icons';
import * as style from './styles/Search.css';
import { ChangeEvent, useState } from 'react';

export default function Search() {
	const [searchValue, setSearchValue] = useState('');

	return (
		<>
			<form className={style.searchForm}>
				<input
					type="text"
					name="search"
					placeholder="Search"
					className={style.searchInput}
					value={searchValue}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value.toLowerCase())}
				/>
				<Link
					to={`/DHmall/search/${searchValue}`}
					onClick={() => setSearchValue('')}
					className={style.searchBtn}>
					<SearchIcon />
				</Link>
			</form>
		</>
	);
}
