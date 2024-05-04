import { style } from '@vanilla-extract/css';

export const loadingContainer = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'rgba(224, 224, 224, 0.2)',
	width: '100dvw',
	height: '100dvh',
	margin: 0,
	zIndex: 100,
});
