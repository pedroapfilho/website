import type { Metadata } from "next";
import Link from "next/link";

import { type Job, resume } from "./data";

const metadata: Metadata = {
  description: resume.title,
  title: `${resume.name} — Resume`,
};

const toIsoMonth = (mmYyyy: string): string | undefined => {
  const groups = /^(?<month>\d{2})\/(?<year>\d{4})$/v.exec(mmYyyy)?.groups;
  return groups ? `${groups.year}-${groups.month}` : undefined;
};

const Header = () => (
  <header className="break-inside-avoid">
    <h1 className="text-3xl font-medium tracking-tight text-balance">{resume.name}</h1>
    <p className="mt-1 text-neutral-500">{resume.title}</p>

    <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
      {resume.contacts.map((c) => (
        <div className="grid grid-cols-[5rem_1fr] items-baseline" key={c.href}>
          <dt className="text-xs tracking-wide text-neutral-500 uppercase">{c.label}</dt>
          <dd>
            <a
              className="hover:decoration-primary-foreground wrap-break-word underline decoration-neutral-300 underline-offset-2"
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
      <h2 className="text-xs font-medium tracking-wide text-neutral-500 uppercase">{title}</h2>
      <hr className="mt-2 mb-4 border-t border-neutral-200" />
    </div>

    {children}
  </section>
);

const Skills = () => (
  <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[max-content_1fr]">
    {resume.skills.map((s) => (
      <div className="contents" key={s.label}>
        <dt className="text-neutral-500 sm:whitespace-nowrap">{s.label}</dt>
        <dd className="text-pretty">{s.items.join(" · ")}</dd>
      </div>
    ))}
  </dl>
);

const Languages = () => (
  <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1">
    {resume.languages.map((l) => (
      <div className="contents" key={l.language}>
        <dt className="text-neutral-500">{l.language}</dt>
        <dd>{l.level}</dd>
      </div>
    ))}
  </dl>
);

const DateRange = ({ value }: { value: string }) => {
  const [start, end] = value.split("—").map((p) => p.trim());
  const startIso = toIsoMonth(start);
  const endIso = toIsoMonth(end);
  return (
    <span className="text-neutral-500 tabular-nums">
      <time dateTime={startIso}>{start}</time>
      {" — "}
      {endIso === undefined ? end : <time dateTime={endIso}>{end}</time>}
    </span>
  );
};

const JobEntry = ({ job }: { job: Job }) => (
  <article>
    <div className="break-inside-avoid">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-medium">{job.company}</h3>
        <DateRange value={job.dates} />
      </header>

      <p className="text-neutral-500">
        {job.role}
        <span className="text-neutral-300"> · </span>
        {job.location}
      </p>

      <p className="mt-1 text-neutral-700 italic">{job.product}</p>

      <ul className="mt-2 flex flex-wrap gap-x-1.5 gap-y-1">
        {job.stack.map((t) => (
          <li
            className="rounded border border-neutral-200 px-1.5 py-0.5 text-xs text-neutral-600"
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
            className="relative pl-4 text-pretty before:absolute before:left-0 before:text-neutral-400 before:content-['•']"
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
  <article className="mx-auto max-w-190 px-6 py-10 text-[0.9375rem] leading-6 sm:px-12 sm:py-14 print:max-w-none print:p-0">
    <nav className="mb-10 flex items-center justify-between text-sm text-neutral-500 print:hidden">
      <Link className="hover:text-primary-foreground" href="/">
        ← back
      </Link>
      {/* oxlint-disable-next-line react-doctor/nextjs-no-a-element -- /resume.pdf is a static asset, not a route: Link would try to client-navigate to it. */}
      <a
        className="hover:text-primary-foreground"
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
        {resume.experience.map((job) => (
          <li key={`${job.company}-${job.dates}`}>
            <JobEntry job={job} />
          </li>
        ))}
      </ol>
    </Section>

    <Section title="Education">
      <p>
        <span className="font-medium">{resume.education.degree}</span>
        <span className="text-neutral-500"> · {resume.education.school}</span>
      </p>
    </Section>

    <Section title="Languages">
      <Languages />
    </Section>
  </article>
);

export { metadata };

export default ResumePage;
