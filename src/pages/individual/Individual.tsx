import { getAuth, signOut } from 'firebase/auth';
import { PurchaseCompleted } from '../../assets/icons';
import * as style from './Individual.css';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../context/useAuthContext';

export default function Individual() {
	const { user } = useAuthContext();
	const [history, setHistory] = useState();

	const auth = getAuth();
	const navigate = useNavigate();

	const getProductDate = useCallback(async () => {
		try {
			if (user && user.loggedState) {
				const docRef = doc(db, 'history', user.id);
				const historyData = await getDoc(docRef);
				const data = historyData.data();
				if (data) {
					setHistory(data.data);
				}
			}
		} catch (error) {
			console.error('getProductDate Error: ', error);
		}
	}, [user]);

	useEffect(() => {
		getProductDate();
	}, [getProductDate]);

	console.log(history);

	function Logout() {
		signOut(auth);
		navigate('/');
		localStorage.removeItem('CartItem');
		localStorage.removeItem('userUid');
	}

	return (
		<main className={style.main}>
			<section className={style.title}>
				<PurchaseCompleted width={'100px'} height={'100px'} />
				<h1>Purchase Completed</h1>
			</section>
			<section>
				<h1>준비중</h1>
				<button onClick={Logout}>Log out</button>
			</section>
		</main>
	);
}
