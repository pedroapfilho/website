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

  @media screen and (max-width: ${(props) => props.theme.breakpoints.xs}) {
    display: flex;
    justify-content: space-around;
  }
`;

const ListItem = styled.li`
  display: inline-block;

  & > a {
    padding: 0.5rem;
    margin: 0.5rem;

    @media screen and (max-width: ${(props) => props.theme.breakpoints.xs}) {
      margin: 0.25rem;
    }
  }
`;

const Link = styled.a`
  font-weight: normal;
  text-decoration: none;
  color: inherit;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.accent};
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <List>
        <ListItem>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/pedroapfilho"
          >
            Code
          </Link>
        </ListItem>
        <ListItem>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/pedroapfilho"
          >
            Thoughts
          </Link>
        </ListItem>
        <ListItem>
          <Link target="_blank" rel="noopener noreferrer" href="/resume.pdf">
            Resume
          </Link>
        </ListItem>
        <ListItem>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://youtube.com/c/ohmyfunction"
          >
            Youtube
          </Link>
        </ListItem>
      </List>
    </Nav>
  );
};

export default Navigation;
