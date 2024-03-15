import { FormEvent, useState } from 'react';
import * as style from './SignUp.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export default function SignUp() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const navigate = useNavigate();
	const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

	async function signUp(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (password !== passwordCheck) {
			return alert('Please check your password.');
		}
		if (password.length < 6) {
			return alert('Password must be at least 6 characters long.');
		}

		if (!emailRegEx.test(id)) alert('The email format does not fit.');

		const docUser = await getDocs(query(collection(db, 'users'), where('user_id', '==', id)));
		const userArr = [];
		docUser.forEach((user) => userArr.push(user.data()));

		if (userArr.length > 1) {
			return alert('This information has already been registered.');
		} else if (userArr.length === 0) {
			const user = await createUserWithEmailAndPassword(auth, id, password);
			console.log(user);

			const userDoc = await addDoc(collection(db, 'users'), {
				user_id: user.user.email,
				user_password: password,
			});
			console.log(userDoc.id);
		}

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
							min={6}
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
