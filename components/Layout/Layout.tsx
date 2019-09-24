import { FC } from "react";
import styled from "styled-components";

const Container = styled.main`
  height: 100vh;
  box-sizing: border-box;
  padding: 2em;
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.secondary};
`;

const Layout: FC = ({ children }) => <Container>{children}</Container>;

export default Layout;
