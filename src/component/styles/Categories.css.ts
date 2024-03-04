import { style } from '@vanilla-extract/css';

export const main = style({
	flex: 2,
	width: '68vw',
	margin: '0 auto',
});

export const container = style({
	display: 'flex',
	gap: 5,
	justifyContent: 'center',
	flexWrap: 'wrap',
});

export const product = style({
	display: 'flex',
	justifyContent: 'center',
	width: '25%',
	flexDirection: 'column',
	backgroundColor: 'white',
	border: '1px solid gray',
	borderRadius: 8,
});

export const imgBox = style({
	marginTop: 15,
	height: 210,
	display: 'flex',
	justifyContent: 'center',
});

export const textBox = style({
	height: 80,
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

export const productTitle = style({
	fontSize: 14,
});

export const productPrice = style({
	fontSize: 16,
	color: 'GrayText',
});
