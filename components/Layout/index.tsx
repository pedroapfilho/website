import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.main`
  height: 100dvh;

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
  <Container>{children}</Container>
);

export default Layout;
