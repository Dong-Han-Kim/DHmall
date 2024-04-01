import { style } from '@vanilla-extract/css';

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
	backgroundColor: 'rgb(0, 150, 255)',
	color: 'white',
	cursor: 'pointer',
});
