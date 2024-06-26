import { style } from '@vanilla-extract/css';

export const main = style({
	width: '68vw',
	margin: '0 auto',
});

export const container = style({
	display: 'flex',
	gap: 5,
	justifyContent: 'flex-start',
	flexWrap: 'wrap',
});

export const product = style({
	display: 'flex',
	width: '15rem',
	flexDirection: 'column',
	backgroundColor: 'white',
	border: '1px solid gray',
	borderRadius: 8,
});

export const imgBox = style({
	marginTop: 15,
	height: 180,
	display: 'flex',
	justifyContent: 'center',
});

export const textBox = style({
	height: 110,
	marginTop: 20,
	textAlign: 'center',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	padding: 8,
	backgroundColor: 'rgba(0, 0, 0, 0.2)',
});

export const productImg = style({
	width: '150px',
	margin: '0 auto',
});

export const titleDiv = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
});

export const productTitle = style({
	fontSize: 14,
});

export const productPrice = style({
	fontSize: 16,
	color: 'GrayText',
});
