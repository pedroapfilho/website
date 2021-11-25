import styled from "styled-components";

interface LinkProps {
  title: string;
  link: string;
}

const StyledLink = styled.a`
  font-weight: normal;
  text-decoration: none;
  color: inherit;
  border-radius: 0.5em;
  transition: all 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.accent};
  }
`;

const Link = ({ title, link }: LinkProps) => (
  <StyledLink href={link} target="_blank" rel="noopener noreferrer">
    {title}
  </StyledLink>
);

export default Link;
