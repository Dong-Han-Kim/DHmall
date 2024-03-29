import { style } from '@vanilla-extract/css';

export const productList = style({
	display: 'flex',
	width: '100%',
	padding: 20,
	alignItems: 'center',
	justifyContent: 'space-between',
});

export const productInfo = style({
	flex: 4,
	textAlign: 'center',
});

export const product = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const productImg = style({
	width: '5rem',
	marginRight: 20,
});

export const productTitle = style({
	width: '27rem',
});

export const productAmount = style({
	flex: 1,
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
});

export const productPrice = style({
	flex: 1,
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
});

export const productDelete = style({
	flex: 1,
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
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
});
