import { style } from '@vanilla-extract/css';

export const loadingContainer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'rgba(0, 150, 255, 0.2)',
	width: '100%',
	height: '100%',
	margin: 0,
	zIndex: 100,
});
