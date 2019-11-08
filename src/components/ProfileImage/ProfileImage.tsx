import React, { FC } from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const StyledImage = styled(Img)`
  margin: 1em;
  border-radius: 0.5em;
`;

const ProfileImage: FC = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "profile-image.jpg" }) {
        childImageSharp {
          fixed(width: 150, height: 150, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <StyledImage fixed={data.file.childImageSharp.fixed} alt="profile-image" />
  );
};

export default ProfileImage;
