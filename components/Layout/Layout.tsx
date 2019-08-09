import { FC } from "react";
import styled from "styled-components";

const Container = styled.main`
  height: 100vh;
  box-sizing: border-box;
  padding: 2em;
`;

const Layout: FC = ({ children }) => <Container>{children}</Container>;

export default Layout;
