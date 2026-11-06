const ExternalLink = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => (
  <a className={className} href={href} rel="noopener noreferrer" target="_blank">
    {children}
    <span className="sr-only"> (opens in new tab)</span>
  </a>
);

export { ExternalLink };
