import { style } from '@vanilla-extract/css';

export const form = style({
	fontWeight: 'bolder',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
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

export const input = style({
	width: 50,
	height: 25,
	borderRadius: 5,
	border: '1px solid black',
});
