import type { AppProps } from "next/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "../theme";

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: ${(props) => props.theme.colors.accent}
  }
`;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
};

export default App;
