import { style } from '@vanilla-extract/css';

export const main = style({
	flex: 2,
	width: '68vw',
	backgroundColor: 'yellow',
	margin: '0 auto',
});

export const container = style({
	display: 'flex',
	flexWrap: 'wrap',
});

export const product = style({
	display: 'flex',
	width: '25%',
	border: '1px solid gray',
	flexDirection: 'column',
});

export const imgBox = style({
	marginTop: 15,
	height: 210,
	display: 'flex',
	justifyContent: 'center',
});

export const textBox = style({
	height: 52,
	marginTop: 20,
	textAlign: 'center',
	backgroundColor: 'Highlight',
});

export const productImg = style({
	width: '150px',
	margin: '0 auto',
});

export const productTitle = style({
	fontSize: 14,
});

export const productPrice = style({
	fontSize: 12,
	color: 'GrayText',
});
