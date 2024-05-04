import { style } from '@vanilla-extract/css';

export const productList = style({
	display: 'flex',
	width: '68vw',
	padding: 20,
	alignItems: 'center',
	justifyContent: 'space-between',
});

export const productInfo = style({
	width: '38vw',
	textAlign: 'center',
});

export const product = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const productImg = style({
	width: '5rem',
	marginRight: '1vw',
});

export const productTitle = style({
	width: '27rem',
});

export const productAmount = style({
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
	width: '9vw',
});

export const productPrice = style({
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
	width: '9vw',
});

export const productDelete = style({
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
	border: '1px solid black',
	borderRadius: '5px',
	backgroundColor: 'transparent',
	width: '9vw',
	':hover': {
		color: 'white',
		backgroundColor: 'rgb(0, 150, 255)',
		border: 'none',
	},
});

export const cartBottom = style({
	display: 'flex',
	justifyContent: 'center',
	paddingTop: 20,
});

export const totalPrice = style({
	marginRight: 5,
});

export const purchase = style({
	marginLeft: 20,
	backgroundColor: 'transparent',
	border: '1px solid black',
	borderRadius: '5px',
	':hover': {
		color: 'white',
		backgroundColor: 'rgb(0, 150, 255)',
		border: 'none',
	},
});
