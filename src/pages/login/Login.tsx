import { FormEvent, useState } from 'react';
import * as style from './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	async function onLogIn(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		const user = await signInWithEmailAndPassword(auth, id, password);
		console.log(user.user.email);
		navigate('/');
	}

	return (
		<main className={style.main}>
			<form>
				<div className={style.loginForm}>
					<div className={style.inputDiv}>
						<label htmlFor="id">ID</label>
						<input
							id="id"
							type="email"
							placeholder="E-mail"
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

					<button className={style.loginBtn} onClick={onLogIn}>
						Login
					</button>

					<Link to={'/signup'}>
						<button className={style.signinBtn}>Go to sign up</button>
					</Link>
				</div>
			</form>
		</main>
	);
}
