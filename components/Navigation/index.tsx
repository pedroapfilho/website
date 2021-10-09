import styled from "styled-components";
import Link from "../Link";

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

  @media screen and (max-width: ${(props) => props.theme.breakpoints.xs}) {
    display: flex;
    justify-content: space-around;
  }
`;

const ListItem = styled.li`
  display: inline-block;

  & > a {
    padding: 0.5em;
    margin: 0.5em;

    @media screen and (max-width: ${(props) => props.theme.breakpoints.xs}) {
      margin: 0.25em;
    }
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <List>
        <ListItem>
          <Link title="Code" link={"https://github.com/pedroapfilho"} />
        </ListItem>
        <ListItem>
          <Link title="Thoughts" link={"https://twitter.com/pedroapfilho"} />
        </ListItem>
        <ListItem>
          <Link title="Blog" link={"https://dev.to/pedroapfilho"} />
        </ListItem>
        <ListItem>
          <Link title="Resume" link="/resume.pdf" />
        </ListItem>
      </List>
    </Nav>
  );
};

export default Navigation;
