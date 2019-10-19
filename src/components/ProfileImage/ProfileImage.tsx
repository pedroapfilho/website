import React, { FC } from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const StyledImage = styled(Img)`
  margin: 1em;
  border-radius: 0.5em;
`;

const ProfileImage: FC = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "profile-image.jpg" }) {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <StyledImage fixed={data.file.childImageSharp.fixed} />}
  />
);

export default ProfileImage;
