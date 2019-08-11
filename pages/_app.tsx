import React from "react";
import App, { Container } from "next/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    color: ${props => props.theme.colors.primary};
  }
`;

const theme = {
  colors: {
    primary: "#040402",
    secondary: "#efefef"
  },
  borderRadius: "6px",
  breakpoints: {
    xs: "567px",
    md: "768px",
    lg: "1200px"
  }
};

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}

export default CustomApp;
