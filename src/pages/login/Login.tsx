import { useState } from 'react';
import * as style from './Login.css';

export default function Login() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	return (
		<main className={style.main}>
			<form>
				<div className={style.loginForm}>
					<div className={style.inputDiv}>
						<label htmlFor="id">ID</label>
						<input
							id="id"
							type="text"
							placeholder="ID"
							value={id}
							onChange={(e) => setId(e.target.value)}
						/>
					</div>
					<div className={style.inputDiv}>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className={style.loginBtn}>Login</button>
				</div>
			</form>
		</main>
	);
}
