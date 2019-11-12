// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
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
