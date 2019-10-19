import React, { FC } from "react";
import Helmet from "react-helmet";

interface SEO {
  title?: string;
}

const SEO: FC<SEO> = ({ title = "Software Engineer" }) => (
  <Helmet>
    <title>Pedro Filho - {title}</title>

    <meta name="title" content="Pedro Filho - Software Engineer" />

    <meta
      name="description"
      content="Curious by nature, entrepreneur, developer practitioner of agile philosophy and JavaScript enthusiast."
    />
  </Helmet>
);

export default SEO;
