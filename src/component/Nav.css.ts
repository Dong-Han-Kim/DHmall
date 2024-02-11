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
	textDecoration: 'none',
	color: 'black',
	marginBottom: 16,
});

export const navItem = style({
	':hover': {
		backgroundColor: 'rgb(0, 150, 255)',
		color: 'white',
	},
	display: 'flex',
	alignItems: 'center',
	padding: 8,
	borderRadius: 5,
	cursor: 'pointer',
});

export const active = style({
	backgroundColor: 'rgb(0, 150, 255)',
	color: 'rgb(255, 255, 255)',
	borderRadius: 5,
	cursor: 'pointer',
});
