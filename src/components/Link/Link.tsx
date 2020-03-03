import React, {FC} from 'react';
import styled from 'styled-components';

interface CustomLink {
	title: string;
	link: string;
}

const StyledLink = styled.a`
	text-decoration: none;
	color: inherit;
	border-radius: 0.5em;
	transition: all 0.2s;

	&:hover {
		color: ${props => props.theme.colors.primary};
		background-color: ${props => props.theme.colors.accent};
	}
`;

const CustomLink: FC<CustomLink> = ({title, link}) => (
	<StyledLink href={link} target="_blank" rel="noopener noreferrer">
		{title}
	</StyledLink>
);

export default CustomLink;
