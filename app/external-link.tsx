/**
 * Owns the `rel`/`target` pairing for every off-site link. Kept in one place so
 * a new link cannot ship with `target="_blank"` and no `rel`.
 */
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
  </a>
);

export { ExternalLink };
