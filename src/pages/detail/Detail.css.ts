import { style } from '@vanilla-extract/css';

export const top = style({
	display: 'flex',
	justifyContent: 'space-between',
	margin: '3rem auto',
	padding: 15,
	width: '60vw',
	height: '17rem',
});

export const imgBox = style({
	marginRight: 15,
	display: 'flex',
	alignItems: 'center',
});

export const img = style({
	width: '11rem',
});

export const info = style({
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column',
});

export const title = style({
	display: 'flex',
	justifyContent: 'flex-end',
});

export const price = style({
	fontSize: '1.5rem',
	fontWeight: 'bolder',
	display: 'flex',
	justifyContent: 'flex-end',
	marginTop: 25,
});

export const input_box = style({
	textAlign: 'center',
	margin: '0 auto',
});

export const count = style({
	width: 40,
	height: 25,
	borderRadius: 5,
	border: '1px solid black',
});

///////////////////////////////////////////////////
export const form = style({
	fontWeight: 'bolder',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginLeft: 'auto',
});

export const button = style({
	fontSize: 20,
	background: 'none',
	border: '1px solid black',
	borderRadius: '5px',
	width: 20,
	padding: 0,
	':hover': {
		color: 'white',
		backgroundColor: 'rgb(0, 150, 255)',
		border: 'none',
	},
	margin: '0 5px',
});

///////////////////////////////////////////////////////////////

export const goToCart = style({
	width: 'fit-content',
	position: 'relative',
	marginLeft: 'auto',
	backgroundColor: 'white',
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
	border: '1px solid black',
	borderRadius: '5px',
	outline: 'none',
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
	textAlign: 'center',
});

export const description = style({
	margin: 20,
});
