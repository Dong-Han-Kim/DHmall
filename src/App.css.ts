import { style } from '@vanilla-extract/css';

export const container = style({
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: 'darkgreen',
	width: '100%',
	height: '100dvh',
});

export const header = style({
	flex: 1,
});

export const main = style({
	flex: 2,
	width: '68vw',
	backgroundColor: 'yellow',
	margin: '0 auto',
});
