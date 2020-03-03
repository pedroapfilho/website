import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primary: string;
			secondary: string;
			accent: string;
		};
		borderRadius: string;
		breakpoints: {
			xs: string;
			md: string;
			lg: string;
		};
	}
}
