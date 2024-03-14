import { FormEvent, useState } from 'react';
import * as style from './SignUp.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
useNavigate;

export default function SignUp() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const navigate = useNavigate();

	async function signUp(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (password !== passwordCheck) {
			return alert('Please check your password.');
		} else if (password.length < 6) {
			return alert('Password must be at least 6 characters long.');
		}
		const user = await createUserWithEmailAndPassword(auth, id, password);
		console.log(user);

		const userDoc = await addDoc(collection(db, 'users'), {
			user_id: user.user.email,
			user_password: password,
		});
		console.log(userDoc.id);

		navigate('/login');
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
							min={6}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className={style.inputDiv}>
						<label htmlFor="">Password Check</label>
						<input
							type="password"
							placeholder="Password Check"
							value={passwordCheck}
							onChange={(e) => setPasswordCheck(e.target.value)}
						/>
					</div>
					<button className={style.signinBtn} onClick={signUp}>
						sign up
					</button>
				</div>
			</form>
		</main>
	);
}
