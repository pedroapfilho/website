import React, {FC} from 'react';
import styled from 'styled-components';
import CustomLink from '../Link';
import {useStaticQuery, graphql, withPrefix} from 'gatsby';

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

const Navigation: FC = () => {
	const {site} = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						social {
							github
							blog
							twitter
						}
					}
				}
			}
		`
	);

	return (
		<Nav>
			<List>
				<ListItem>
					<CustomLink
						title="Code"
						link={`${site.siteMetadata.social.github}`}
					/>
				</ListItem>
				<ListItem>
					<CustomLink
						title="Thoughts"
						link={`${site.siteMetadata.social.twitter}`}
					/>
				</ListItem>
				<ListItem>
					<CustomLink title="Blog" link={site.siteMetadata.social.blog} />
				</ListItem>
				<ListItem>
					<CustomLink title="Resume" link={withPrefix('/resume.pdf')} />
				</ListItem>
			</List>
		</Nav>
	);
};

export default Navigation;
