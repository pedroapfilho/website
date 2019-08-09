import { FC } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  text-align: center;
  width: 100%;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  display: inline-block;
  padding: 1em;
`;

const Navigation: FC = () => (
  <Nav>
    <List>
      <ListItem>Code</ListItem>
      <ListItem>Blog</ListItem>
      <ListItem>Resume</ListItem>
      <ListItem>Story</ListItem>
    </List>
  </Nav>
);

export default Navigation;
