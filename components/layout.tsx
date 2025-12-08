import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <main className="h-dvh box-border p-8 text-primary bg-secondary dark:text-secondary dark:bg-primary">
    {children}
  </main>
);

export default Layout;
