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
					onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value.toLowerCase())}
				/>
				<Link to={`search/${searchValue}`}>
					<button className={style.searchBtn} onChange={() => setSearchValue('')}>
						<SearchIcon />
					</button>
				</Link>
			</form>
		</>
	);
}
