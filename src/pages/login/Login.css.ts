import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('input', {
	height: '2rem',
});

export const main = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '20rem',
	flexDirection: 'column',
});

export const loginForm = style({
	display: 'flex',
	flexDirection: 'column',
	width: '16rem',
});

export const inputDiv = style({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '2rem',
	selectors: {
		'&:nth': {
			height: '3rem',
		},
	},
});

export const loginBtn = style({
	backgroundColor: 'rgb(0, 150, 255)',
	color: 'white',
	padding: 10,
	border: 'none',
	cursor: 'pointer',
});

export const signinBtn = style({
	backgroundColor: 'rgb(0, 150, 255)',
	color: 'white',
	padding: 10,
	border: 'none',
	cursor: 'pointer',
	width: '16rem',
	marginTop: 8,
});
