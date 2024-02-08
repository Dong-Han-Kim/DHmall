import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	width: '100%',
	justifyContent: 'center',
});

export const nav = style({
	display: 'flex',
	listStyle: 'none',
	justifyContent: 'space-around',
	width: '100%',
	fontWeight: 'bolder',
	textTransform: 'uppercase',
	padding: '0 0 2rem 0',
	fontSize: 'large',
});

export const navItem = style({
	':hover': {
		backgroundColor: 'rgb(0, 150, 255)',
		color: 'white',
	},
	padding: 8,
	borderRadius: 5,
	cursor: 'pointer',
});
