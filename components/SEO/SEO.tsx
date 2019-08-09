import { FC } from "react";
import Head from "next/head";

interface ISEO {
  title?: string;
}

const SEO: FC<ISEO> = ({ title = "Software Developer" }) => (
  <Head>
    <title>Pedro Filho - {title}</title>
  </Head>
);

export default SEO;
