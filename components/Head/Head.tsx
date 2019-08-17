import { FC } from "react";
import Head from "next/head";

interface SEO {
  title?: string;
}

const SEO: FC<SEO> = ({ title = "Software Engineer" }) => (
  <Head>
    <title>Pedro Filho - {title}</title>

    <meta name="title" content="Pedro Filho - Software Engineer" />

    <meta
      name="description"
      content="Curious by nature, entrepreneur, developer practitioner of agile philosophy and JavaScript enthusiast."
    />

    <link rel="icon" href="../static/favicon.ico" />
  </Head>
);

export default SEO;
