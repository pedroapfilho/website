import type { Metadata } from "next";
import Link from "next/link";

import { ExternalLink } from "@/app/external-link";
import { SiteFooter } from "@/app/site-footer";

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
        <div className="grid-cols-resume grid items-baseline" key={c.href}>
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
      <hr className="mt-2 mb-4" />
    </div>

    {children}
  </section>
);

const Skills = () => (
  <dl className="sm:grid-cols-intrinsic-label grid grid-cols-1 gap-x-8 gap-y-2">
    {resume.skills.map((skill) => (
      <div className="contents" key={skill.label}>
        <dt className="text-muted-foreground sm:whitespace-nowrap">{skill.label}</dt>
        <dd className="text-pretty">{skill.items.join(" · ")}</dd>
      </div>
    ))}
  </dl>
);

const Languages = () => (
  <dl className="grid-cols-intrinsic-label grid gap-x-6 gap-y-1">
    {resume.languages.map((entry) => (
      <div className="contents" key={entry.language}>
        <dt className="text-muted-foreground">{entry.language}</dt>
        <dd>{entry.level}</dd>
      </div>
    ))}
  </dl>
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
        {job.role} · {job.location}
      </p>

      <p className="text-foreground/80 mt-1 italic">{job.product}</p>

      <ul className="mt-2 flex flex-wrap gap-x-1.5 gap-y-1">
        {job.stack.map((t) => (
          <li className="text-foreground/80 rounded border px-1.5 py-0.5 text-xs" key={t}>
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
            className="before:text-muted-foreground before:content-bullet relative pl-4 text-pretty before:absolute before:left-0"
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
    <main className="text-resume mx-auto max-w-3xl px-6 pt-10 leading-6 sm:px-12 sm:pt-14 print:max-w-none print:p-0">
      <nav className="text-muted-foreground mb-10 flex items-center justify-between text-sm print:hidden">
        <Link className="hover:text-foreground" href="/">
          ← back
        </Link>
        <ExternalLink className="hover:text-foreground" href="/resume.pdf">
          download as PDF →
        </ExternalLink>
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
    </main>
    <div className="mx-auto w-full max-w-3xl px-6 pb-8 sm:px-12 sm:pb-10 print:hidden">
      <SiteFooter />
    </div>
  </>
);

export const instant = true;

export { metadata };

export default ResumePage;
