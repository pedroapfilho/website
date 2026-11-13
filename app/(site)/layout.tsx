import { SiteFooter } from "../site-footer";

import { IndexNav } from "./index-nav";

const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 flex-col px-5 pt-6 pb-8 sm:px-12 sm:pt-10 sm:pb-10">
    <IndexNav />
    <main className="gap-x-gutter grid flex-1 grid-cols-6 content-start lg:grid-cols-12">
      {children}
    </main>
    <SiteFooter />
  </div>
);

export default SiteLayout;
