import { FC } from "react";
import Head from "next/head";

interface ISEO {
  title?: string;
}

const SEO: FC<ISEO> = ({ title = "Software Engineer" }) => (
  <Head>
    <title>Pedro Filho - {title}</title>

    <link rel="icon" href="../static/favicon.ico" />
  </Head>
);

export default SEO;
