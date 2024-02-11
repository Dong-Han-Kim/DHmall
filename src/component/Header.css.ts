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
	padding: '1rem 5rem',
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

export const searchForm = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const searchInput = style({
	width: '26vw',
	height: 40,
	border: '1px solid lightgray',
	outline: 'none',
});

export const searchBtn = style({
	width: 40,
	height: 40,
	padding: 10,
	border: 'none',
	outline: 'none',
	backgroundColor: 'rgb(0, 150, 255)',
	cursor: 'pointer',
});

// User section
export const individual = style({
	width: 150,
	display: 'flex',
	justifyContent: 'space-between',
	marginRight: '4rem',
});

export const cart = style({
	width: 40,
	marginLeft: '3rem',
	cursor: 'pointer',
});

export const user = style({
	width: 40,
	cursor: 'pointer',
});
