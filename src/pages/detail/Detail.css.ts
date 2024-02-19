import { style } from '@vanilla-extract/css';

export const top = style({
	display: 'flex',
	justifyContent: 'space-between',
	margin: '0 auto',
	padding: 15,
});

export const imgBox = style({
	marginRight: 15,
});

export const img = style({
	width: '11rem',
});

export const info = style({
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column',
});

export const price = style({
	fontSize: '1.5rem',
	fontWeight: 'bolder',
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: 25,
});

export const count = style({
	width: '11rem',
	height: '2rem',
	display: 'flex',
	marginLeft: 'auto',
});

export const addToCart = style({
	width: '11rem',
	padding: 15,
	position: 'relative',
	marginLeft: 'auto',
	backgroundColor: 'white',
	':hover': {
		backgroundColor: 'rgb(0, 150, 255)',
		color: 'white',
	},
	border: '1p solid black',
});

export const division = style({
	width: '68vw',
	margin: '0 auto',
});

export const bottom = style({
	width: '68vw',
	margin: '0 auto',
	fontSize: '1.25rem',
	padding: 15,
});
