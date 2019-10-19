import React, { FC } from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface Head {
  title?: string;
}

const Head: FC<Head> = ({ title = "Software Engineer" }) => {
  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
        file(relativePath: { eq: "profile-image.jpg" }) {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    `
  );

  return (
    <Helmet
      htmlAttributes={{
        lang: "en"
      }}
      title={title}
      titleTemplate={`${site.siteMetadata.title} - %s`}
      meta={[
        {
          name: `description`,
          content: site.siteMetadata.description
        },
        {
          property: `og:title`,
          content: site.siteMetadata.title
        },
        {
          property: `og:description`,
          content: site.siteMetadata.description
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.siteUrl}${file.childImageSharp.fixed.src}`
        }
      ]}
    />
  );
};

export default Head;
