import { ReactNode } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "../../theme";

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

const Container = styled.main`
  height: 100vh;

  box-sizing: border-box;
  padding: 2em;

  @media (prefers-color-scheme: light) {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.secondary};
  }

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const Layout = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <Container>
      <>
        <GlobalStyle />
        {children}
      </>
    </Container>
  </ThemeProvider>
);

export default Layout;
