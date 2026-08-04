const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="isolate mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 sm:px-12">
    {children}
  </main>
);

export default SiteLayout;
