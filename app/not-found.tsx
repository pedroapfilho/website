import type { Metadata } from "next";
import Link from "next/link";

import SiteLayout from "./(site)/layout";
import { PageIntro, PageTitle } from "./(site)/poster";

const metadata: Metadata = {
  title: "Page not found",
};

const NotFound = () => (
  <SiteLayout>
    <PageTitle>Page not found</PageTitle>
    <PageIntro>
      <p>
        There is no page at this address.{" "}
        <Link className="link-draw" href="/">
          Back home
        </Link>
      </p>
    </PageIntro>
  </SiteLayout>
);

export { metadata };

export default NotFound;
