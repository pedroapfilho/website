import type { Metadata } from "next";
import Link from "next/link";

import SiteLayout from "./(site)/layout";

const metadata: Metadata = {
  title: "Page not found",
};

const NotFound = () => (
  <SiteLayout>
    <h1 className="col-span-full mt-16 text-7xl leading-none tracking-tight text-balance sm:mt-24 sm:text-8xl lg:text-9xl">
      Page not found
    </h1>
    <p className="col-span-full mt-10 max-w-md text-sm leading-6 text-pretty lg:col-start-5 lg:col-end-9 lg:mt-16">
      There is no page at this address.{" "}
      <Link
        className="link-draw outline-ring focus-visible:outline-2 focus-visible:outline-offset-4"
        href="/"
      >
        Back home
      </Link>
    </p>
  </SiteLayout>
);

export { metadata };

export default NotFound;
