import { useState } from 'react';
import * as style from './Login.css';

export default function Login() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [isLoginMode, setLoginMode] = useState(true);

	return (
		<main className={style.main}>
			<form>
				<div className={style.loginForm}>
					<div className={style.inputDiv}>
						<label htmlFor="id">ID</label>
						<input
							id="id"
							type="email"
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
					{!isLoginMode && (
						<div className={style.inputDiv}>
							<label htmlFor="">Password Check</label>
							<input
								type="password"
								placeholder="Password Check"
								value={passwordCheck}
								onChange={(e) => setPasswordCheck(e.target.value)}
							/>
						</div>
					)}
					{!isLoginMode ? null : <button className={style.loginBtn}>Login</button>}
				</div>
			</form>
			<button className={style.signinBtn} onClick={() => setLoginMode(!isLoginMode)}>
				Sign In
			</button>
		</main>
	);
}
