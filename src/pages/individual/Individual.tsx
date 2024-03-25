import { getAuth, signOut } from 'firebase/auth';
import { PurchaseCompleted } from '../../assets/icons';
import * as style from './Individual.css';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../context/useAuthContext';
import { useCartContext } from '../../context/useCartContext';

export default function Individual() {
	const { user } = useAuthContext();
	const { setProduct } = useCartContext();
	const [history, setHistory] = useState();
	const userUid = localStorage.getItem('userUid');

	const auth = getAuth();
	const navigate = useNavigate();

	const getProductDate = useCallback(async () => {
		try {
			if (user && user.loggedState) {
				const docRef = doc(db, 'history', userUid);
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

	return (
		<main className={style.main}>
			<section className={style.title}>
				<PurchaseCompleted width={'100px'} height={'100px'} />
				<h1>Purchase Completed</h1>
			</section>
			<section>
				<h1>준비중</h1>
				<button
					onClick={() => {
						signOut(auth);
						navigate('/');
						setProduct([]);
						localStorage.removeItem('userUid');
					}}>
					Log out
				</button>
			</section>
		</main>
	);
}
