import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	width: '68vw',
	margin: '15px auto',
	height: '18vh',
	borderBottom: '1px solid lightgray',
});

export const headerTop = style({
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	flexDirection: 'row',
	justifyContent: 'space-evenly',
	padding: '1rem 6rem',
});

export const logo = style({
	width: '100px',
	marginLeft: '4rem',
	cursor: 'pointer',
});

export const search = style({
	display: 'flex',
	width: '100%',
	height: 40,
	justifyContent: 'center',
	alignItems: 'center',
});

export const cart = style({
	display: 'flex',
	width: 40,
	height: 40,
	marginRight: '4.5rem',
	cursor: 'pointer',
});

export const cartLink = style({
	display: 'flex',
	alignItems: 'center',
});

export const cartLength = style({
	backgroundColor: 'rgb(0, 150, 255)',
	color: 'white',
	fontWeight: 'bolder',
	borderRadius: '50%',
	position: 'relative',
	width: 20,
	height: 20,
	zIndex: 5,
	top: -15,
	right: 10,
	textAlign: 'center',
	fontSize: 15,
});

export const user = style({
	width: 40,
	cursor: 'pointer',
	marginRight: 20,
});

export const profileImg = style({
	width: '50px',
	height: '50px',
	border: '3px solid black',
	borderRadius: '50%',
});
