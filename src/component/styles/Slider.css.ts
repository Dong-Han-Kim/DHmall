import { style } from '@vanilla-extract/css';

export const slide = style({
	width: '68vw',
	height: '48vh',
});

export const slideBtnBox = style({
	position: 'relative',
	zIndex: 5,
	top: -70,
	padding: 15,
});

export const slideBtn = style({
	padding: 15,
	fontSize: 20,
	fontWeight: 'bolder',
	background: 'rgb(0, 150, 255)',
	color: 'white',
	border: 'none',
	boxShadow: '5px 5px 5px black',
	transition: 'all 300ms ease-in',
	':hover': {
		transform: 'scale(1.1)',
	},
});
