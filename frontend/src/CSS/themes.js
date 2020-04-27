import { createMuiTheme } from '@material-ui/core';

export const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		background: {
			default: '#2C3544'
		}
	},
});

export const lightTheme = createMuiTheme({
	palette: {
		type: 'light',
		background: {
			default: '#E2E2E2'
		}
	},
});