import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { PurchaseCompleted, User } from '../../assets/icons';
import * as style from './Individual.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { v4 as uuid } from 'uuid';
import { useAuthContext } from '../../context/useAuthContext';

export default function Individual() {
	const [isModify, setIsModify] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const [nickName, setNickName] = useState('');
	const { user } = useAuthContext();
	const auth = getAuth();
	const navigate = useNavigate();
	// const profileImg = localStorage.getItem('userImg');
	// const profileName = localStorage.getItem('nickName');

	function Logout() {
		signOut(auth);
		navigate('/');
		localStorage.removeItem('CartItem');
		localStorage.removeItem('userUid');
		// localStorage.removeItem('userImg');
		// localStorage.removeItem('nickName');
	}

	return (
		<main className={style.main}>
			<section className={style.title}>
				<PurchaseCompleted width={'100px'} height={'100px'} />
				<p>Profile</p>
			</section>
			<section className={style.profile__section}>
				{!isModify ? (
					<>
						<div className={style.profile__img}>
							{!user.image ? <User /> : <img src={user.image} className={style.profile__user_img} />}
						</div>
						<div className={style.profile__right}>
							<p>Name : {user.nickName}</p>
							<button className={style.profile__Button} onClick={() => setIsModify(true)}>
								Modify
							</button>
							<button className={style.profile__Button} onClick={Logout}>
								Log out
							</button>
						</div>
					</>
				) : (
					<>
						<div className={style.profile__img}>
							<label htmlFor="file">
								{!user.image ? <User /> : <img src={user.image} className={style.profile__user_img} />}
							</label>
							<input
								id="file"
								type="file"
								className={style.profile__input}
								onChange={async (e) => {
									try {
										const file = e.target.files[0];
										const imageId = uuid();
										await uploadBytes(ref(storage, imageId), file);
										const url = await getDownloadURL(ref(storage, imageId));
										localStorage.setItem('userImg', url);
										setImageUrl(url);
									} catch (error) {
										console.error(error);
									}
								}}
							/>
						</div>
						<div className={style.profile__right}>
							<label htmlFor="name">Name : </label>
							<input
								id="name"
								type="text"
								value={!user.nickName && nickName}
								onChange={(e) => {
									localStorage.setItem('nickName', e.target.value);
									setNickName(e.target.value);
								}}
							/>
							<button
								onClick={async () => {
									await updateProfile(auth.currentUser, {
										photoURL: imageUrl,
										displayName: nickName,
									});

									setIsModify(false);
								}}>
								Save
							</button>
							<button
								onClick={() => {
									localStorage.removeItem('userImg');
									localStorage.removeItem('nickName');
									setIsModify(false);
								}}>
								Cancel
							</button>
						</div>
					</>
				)}
			</section>
		</main>
	);
}
