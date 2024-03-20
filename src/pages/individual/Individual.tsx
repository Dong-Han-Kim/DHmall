import { getAuth, signOut } from 'firebase/auth';
import { PurchaseCompleted } from '../../assets/icons';
import * as style from './Individual.css';
import { useNavigate } from 'react-router-dom';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useState } from 'react';
import { useAuthContext } from '../../context/useAuthContext';

export default function Individual() {
	const { user } = useAuthContext();
	const [history, setHistory] = useState<DocumentData>([]);
	const auth = getAuth();
	const navigate = useNavigate();
	const getProductDate = async () => {
		try {
			const data = user && (await getDoc(doc(db, 'history', user.user_id)));
			const historyData = data && data.data();
			setHistory([
				{
					date: historyData?.date || '',
					products: historyData?.product || [],
				},
			]);
		} catch (error) {
			console.error('getProductDate Error: ', error);
		}
	};
	if (user.loggedState) {
		getProductDate();
	}

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
					}}>
					Log out
				</button>
			</section>
		</main>
	);
}
