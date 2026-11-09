const PageTitle = ({
  children,
  ref,
  tabIndex,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLHeadingElement>;
  tabIndex?: number;
}) => (
  <h1
    className="col-span-full mt-16 text-7xl leading-none tracking-tight text-balance outline-none sm:mt-24 sm:text-8xl lg:text-9xl"
    ref={ref}
    tabIndex={tabIndex}
  >
    {children}
  </h1>
);

const PageIntro = ({ children }: { children: React.ReactNode }) => (
  <div className="col-span-full mt-10 flex max-w-md flex-col gap-3 text-sm leading-6 text-pretty lg:col-start-5 lg:col-end-9 lg:mt-16">
    {children}
  </div>
);

const PageSection = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <section className="col-span-full mt-16 sm:mt-20">
    <h2 className="mb-4 text-xs leading-6 tracking-widest uppercase">{title}</h2>
    {children}
  </section>
);

const HostCaption = ({ href }: { href: string }) => (
  <span className="text-xs leading-6 tracking-widest uppercase lg:col-span-3">
    {new URL(href).hostname.replace(/^www\./v, "")}
  </span>
);

export { HostCaption, PageIntro, PageSection, PageTitle };
