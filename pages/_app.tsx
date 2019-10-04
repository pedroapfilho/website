import React from "react";
import App from "next/app";
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

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    );
  }
}

export default CustomApp;
