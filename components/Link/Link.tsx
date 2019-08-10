import { FC } from "react";
import styled from "styled-components";

interface ICustomLink {
  title: string;
  link: string;
}

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  border-radius: 0.5em;
  transition: all 0.2s;
  &:hover {
    background-color: ${props => props.theme.color.secondary};
  }
`;

const CustomLink: FC<ICustomLink> = ({ title, link }) => (
  <StyledLink href={link}>{title}</StyledLink>
);

export default CustomLink;
