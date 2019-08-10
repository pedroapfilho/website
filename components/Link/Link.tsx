import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

interface ICustomLink {
  title: string;
  link: string;
  fetch?: boolean;
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

const CustomLink: FC<ICustomLink> = ({ title, link, fetch = false }) => (
  <Link prefetch={fetch} href={link} passHref>
    <StyledLink>{title}</StyledLink>
  </Link>
);

export default CustomLink;
