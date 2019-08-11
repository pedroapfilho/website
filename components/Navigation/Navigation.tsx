import { FC } from "react";
import styled from "styled-components";
import CustomLink from "../Link";

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

  @media screen and (max-width: ${props => props.theme.breakpoints.xs}) {
    display: flex;
    justify-content: space-around;
  }
`;

const ListItem = styled.li`
  display: inline-block;

  & > a {
    padding: 0.5em;
    margin: 0.5em;

    @media screen and (max-width: ${props => props.theme.breakpoints.xs}) {
      margin: 0.25em;
    }
  }
`;

const Navigation: FC = () => (
  <Nav>
    <List>
      <ListItem>
        <CustomLink title="Code" link="https://github.com/pedroapfilho" />
      </ListItem>
      <ListItem>
        <CustomLink title="Blog" link="https://dev.to/pedroapfilho" />
      </ListItem>
      <ListItem>
        <CustomLink title="Thoughts" link="https://twitter.com/pedrofilhome" />
      </ListItem>
      <ListItem>
        <CustomLink title="Contact" link="mailto:pedro@filho.me" />
      </ListItem>
    </List>
  </Nav>
);

export default Navigation;
