import type { Metadata } from "next";
import Link from "next/link";

import { BottomNav } from "./bottom-nav";
import { type IsoMonth, type Job, resume } from "./data";

const metadata: Metadata = {
  description: resume.title,
  title: "Resume",
};

const formatMonth = (isoMonth: IsoMonth): string =>
  `${isoMonth.slice(5, 7)}/${isoMonth.slice(0, 4)}`;

const Header = () => (
  <header className="break-inside-avoid">
    <h1 className="text-3xl font-medium tracking-tight text-balance">{resume.name}</h1>
    <p className="text-muted-foreground mt-1">{resume.title}</p>

    <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
      {resume.contacts.map((c) => (
        <div className="grid grid-cols-[5rem_1fr] items-baseline" key={c.href}>
          <dt className="text-muted-foreground text-xs tracking-wide uppercase">{c.label}</dt>
          {/* min-w-0 lets the 1fr track shrink below the value's min-content width:
              wrap-break-word alone does not reduce it, so a long handle would
              widen the track and print past the page margin instead of wrapping. */}
          <dd className="min-w-0">
            <a
              className="decoration-muted-foreground/60 hover:decoration-foreground wrap-break-word underline underline-offset-2"
              href={c.href}
            >
              {c.display}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  </header>
);

const Section = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <section className="mt-9 text-sm">
    <div className="break-inside-avoid">
      <h2 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{title}</h2>
      <hr className="border-border mt-2 mb-4 border-t" />
    </div>

    {children}
  </section>
);

type DefinitionRow = {
  term: string;
  value: string;
};

const DefinitionGrid = ({
  listClassName,
  rows,
  termClassName,
  valueClassName = "",
}: {
  listClassName: string;
  rows: Array<DefinitionRow>;
  termClassName: string;
  valueClassName?: string;
}) => (
  <dl className={listClassName}>
    {rows.map((row) => (
      <div className="contents" key={row.term}>
        <dt className={termClassName}>{row.term}</dt>
        <dd className={valueClassName}>{row.value}</dd>
      </div>
    ))}
  </dl>
);

const Skills = () => (
  <DefinitionGrid
    listClassName="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[max-content_1fr]"
    rows={resume.skills.map((s) => ({ term: s.label, value: s.items.join(" · ") }))}
    termClassName="text-muted-foreground sm:whitespace-nowrap"
    valueClassName="text-pretty"
  />
);

const Languages = () => (
  <DefinitionGrid
    listClassName="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1"
    rows={resume.languages.map((l) => ({ term: l.language, value: l.level }))}
    termClassName="text-muted-foreground"
  />
);

const DATE_SEPARATOR = " \u2013 ";
const PRESENT_LABEL = "present";

const DateRange = ({ end, start }: { end: IsoMonth | null; start: IsoMonth }) => (
  <span className="text-muted-foreground tabular-nums">
    <time dateTime={start}>{formatMonth(start)}</time>
    {DATE_SEPARATOR}
    {end === null ? PRESENT_LABEL : <time dateTime={end}>{formatMonth(end)}</time>}
  </span>
);

const JobEntry = ({ end, job }: { end: IsoMonth | null; job: Job }) => (
  <article>
    <div className="break-inside-avoid">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-medium">{job.company}</h3>
        <DateRange end={end} start={job.start} />
      </header>

      <p className="text-muted-foreground">
        {job.role}
        <span className="text-muted-foreground"> · </span>
        {job.location}
      </p>

      <p className="text-foreground/80 mt-1 italic">{job.product}</p>

      <ul className="mt-2 flex flex-wrap gap-x-1.5 gap-y-1">
        {job.stack.map((t) => (
          <li
            className="border-border text-foreground/80 rounded border px-1.5 py-0.5 text-xs"
            key={t}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>

    <p className="mt-3 text-pretty">{job.description}</p>

    {job.metrics.length > 0 && (
      <ul className="mt-2 flex flex-col gap-1">
        {job.metrics.map((m) => (
          <li
            className="before:text-muted-foreground relative pl-4 text-pretty before:absolute before:left-0 before:content-['•']"
            key={m}
          >
            {m}
          </li>
        ))}
      </ul>
    )}
  </article>
);

const ResumePage = () => (
  <>
    <article className="mx-auto max-w-3xl px-6 py-10 text-[0.9375rem] leading-6 sm:px-12 sm:py-14 print:max-w-none print:p-0">
      <nav className="text-muted-foreground mb-10 flex items-center justify-between text-sm print:hidden">
        <Link className="hover:text-foreground" href="/">
          ← back
        </Link>
        {/* oxlint-disable-next-line react-doctor/nextjs-no-a-element -- /resume.pdf is a static asset, not a route: Link would try to client-navigate to it. */}
        <a
          className="hover:text-foreground"
          href="/resume.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          download as PDF →
        </a>
      </nav>

      <Header />

      <Section title="About">
        <p className="text-pretty">{resume.summary}</p>
      </Section>

      <Section title="Skills">
        <Skills />
      </Section>

      <Section title="Experience">
        <ol className="flex flex-col gap-6">
          {resume.experience.map((job, index) => (
            <li key={`${job.company}-${job.start}`}>
              <JobEntry end={resume.experience[index - 1]?.start ?? null} job={job} />
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Education">
        <p>
          <span className="font-medium">{resume.education.degree}</span>
          <span className="text-muted-foreground"> · {resume.education.school}</span>
        </p>
      </Section>

      <Section title="Languages">
        <Languages />
      </Section>
    </article>
    <BottomNav />
  </>
);

export const instant = true;
export { metadata };

export default ResumePage;
