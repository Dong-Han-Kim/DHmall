import { style } from '@vanilla-extract/css';

export const main = style({
	width: '68vw',
	margin: '0 auto',
});

export const product__box = style({
	display: 'flex',
	justifyContent: 'space-between',
	padding: '25px 30px',
	alignItems: 'center',
	margin: '25px 0',
	borderBottom: '1px solid gray',
});

export const product__img = style({
	width: '5rem',
});

export const product__title = style({
	fontWeight: 700,
	fontSize: 18,
	width: '25rem',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

export const product__price = style({
	color: '#a4a5a6',
});
