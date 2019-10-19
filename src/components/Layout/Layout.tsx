import React, { FC } from "react";
import styled from "styled-components";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const theme = {
  colors: {
    primary: "#1a1a1a",
    secondary: "#ffffff",
    accent: "#f7f7f7"
  },
  borderRadius: "6px",
  breakpoints: {
    xs: "567px",
    md: "768px",
    lg: "1200px"
  }
};

const Container = styled.main`
  height: 100vh;
  box-sizing: border-box;
  padding: 2em;
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.secondary};
`;

const Layout: FC = ({ children }) => (
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