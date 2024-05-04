import { style } from '@vanilla-extract/css';

export const main = style({
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	width: '68vw',
	margin: '0 auto',
});

export const productInfoBox = style({
	display: 'flex',
	justifyContent: 'space-between',
	width: '68vw',
	padding: 20,
	fontWeight: 'bolder',
});

export const productInfo = style({
	width: '38vw',
	textAlign: 'center',
});

export const productAmount = style({
	width: '9vw',
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
});

export const productPrice = style({
	width: '9vw',
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
});

export const productDelete = style({
	width: '9vw',
	display: 'flex',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
});
