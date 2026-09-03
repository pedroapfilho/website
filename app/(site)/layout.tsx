// Visual direction: "The Poster" (Swiss grid, Host Grotesk, black on white, no
// hairlines). The recorded system lives in DESIGN.md; this shell scopes it to
// (site) so /resume keeps rendering on the root body defaults.

import { IndexNav } from "./index-nav";
import { SiteFooter } from "./site-footer";

const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-paper text-ink flex flex-1 flex-col px-5 pt-6 pb-8 font-sans sm:px-12 sm:pt-10 sm:pb-10">
    <IndexNav />
    <div className="grid flex-1 grid-cols-6 content-start gap-x-4 lg:grid-cols-12 lg:gap-x-6">
      {children}
    </div>
    <SiteFooter />
  </div>
);

export default SiteLayout;
