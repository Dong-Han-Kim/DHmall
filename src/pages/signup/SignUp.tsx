import { FormEvent, useState } from 'react';
import * as style from './SignUp.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { setDoc, collection, getDocs, query, where, doc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

export default function SignUp() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const navigate = useNavigate();
	const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

	async function signUp(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		// 비밀번호 체크
		if (password !== passwordCheck) {
			return alert('Please check your password.');
		}
		if (password.length < 6) {
			return alert('Password must be at least 6 characters long.');
		}

		// 이메일 형식 체크
		if (!emailRegEx.test(id)) alert('The email format does not fit.');

		// 이미 가입된 정보 체크
		const docUser = await getDocs(query(collection(db, 'users'), where('name', '==', id)));
		const userArr = [];
		docUser.forEach((user) => userArr.push(user.data()));

		if (userArr.length >= 1) {
			return alert('This information has already been registered.');
		} else if (userArr.length === 0) {
			await createUserWithEmailAndPassword(auth, id, password);

			// 신규 가입
			const userDocId = uuid();
			const newUser = {
				id: userDocId,
				name: id,
				password: password,
			};
			await setDoc(doc(db, 'users', userDocId), newUser);
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
