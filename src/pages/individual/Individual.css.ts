import { style } from '@vanilla-extract/css';

export const main = style({
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	alignItems: 'center',
});

export const title = style({
	display: 'flex',
	alignItems: 'center',
	fontSize: 100,
	fontWeight: 700,
});

export const profile__section = style({
	display: 'flex',
	justifyContent: 'center',
	margin: '20px auto',
	alignItems: 'center',
});

export const profile__img = style({
	width: 100,
	height: 100,
	padding: 10,
	margin: '0 auto',
	border: '5px solid black',
	borderRadius: '50%',
	position: 'relative',
});

export const profile__input = style({
	cursor: 'pointer',
	width: 80,
	height: 80,
	display: 'none',
	top: 0,
	left: 0,
});

export const profile__user_img = style({
	width: 100,
	height: 100,
	border: '5px solid black',
	borderRadius: '50%',
	position: 'relative',
	top: -15,
	left: -15,
});

export const profile__right = style({
	display: 'flex',
	flexDirection: 'column',
	fontWeight: 700,
	marginLeft: 15,
});

export const profile__Button = style({
	marginTop: 8,
});
