import type { Metadata } from "next";
import Link from "next/link";
import { type Job, resume } from "./data";

const metadata: Metadata = {
  title: `${resume.name} — Resume`,
  description: resume.title,
};

const toIsoMonth = (mmYyyy: string): string | undefined => {
  const match = mmYyyy.match(/^(\d{2})\/(\d{4})$/);
  return match ? `${match[2]}-${match[1]}` : undefined;
};

const ResumePage = () => (
  <article className="mx-auto max-w-190 px-6 py-10 sm:px-12 sm:py-14 print:max-w-none print:p-0 text-[0.9375rem] leading-6">
    <nav className="mb-10 flex items-center justify-between text-sm text-neutral-500 print:hidden">
      <Link href="/" className="hover:text-primary-foreground">
        ← back
      </Link>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-foreground"
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
      <ol role="list" className="flex flex-col gap-6">
        {resume.experience.map((job, i) => (
          <li key={`${job.company}-${i}`}>
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

const Header = () => (
  <header className="break-inside-avoid">
    <h1 className="text-3xl font-medium tracking-tight text-balance">
      {resume.name}
    </h1>
    <p className="mt-1 text-neutral-500">{resume.title}</p>

    <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
      {resume.contacts.map((c) => (
        <div
          key={c.href}
          className="grid grid-cols-[5rem_1fr] items-baseline"
        >
          <dt className="text-xs uppercase tracking-wide text-neutral-500">
            {c.label}
          </dt>
          <dd>
            <a
              href={c.href}
              className="underline decoration-neutral-300 underline-offset-2 hover:decoration-primary-foreground wrap-break-word"
            >
              {c.display}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  </header>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-9 text-sm">
    <div className="break-inside-avoid">
      <h2 className="text-xs uppercase tracking-wide font-medium text-neutral-500">
        {title}
      </h2>
      <hr className="mt-2 mb-4 border-t border-neutral-200" />
    </div>

    {children}
  </section>
);

const Skills = () => (
  <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[max-content_1fr]">
    {resume.skills.map((s) => (
      <div key={s.label} className="contents">
        <dt className="text-neutral-500 sm:whitespace-nowrap">{s.label}</dt>
        <dd className="text-pretty">{s.items.join(" · ")}</dd>
      </div>
    ))}
  </dl>
);

const Languages = () => (
  <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1">
    {resume.languages.map((l) => (
      <div key={l.language} className="contents">
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
    <span className="tabular-nums text-neutral-500">
      <time dateTime={startIso}>{start}</time>
      {" — "}
      {endIso ? <time dateTime={endIso}>{end}</time> : end}
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

      <p className="mt-1 italic text-neutral-700">{job.product}</p>

      <ul role="list" className="mt-2 flex flex-wrap gap-x-1.5 gap-y-1">
        {job.stack.map((t) => (
          <li
            key={t}
            className="rounded border border-neutral-200 px-1.5 py-0.5 text-xs text-neutral-600"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>

    <p className="mt-3 text-pretty">{job.description}</p>

    {job.metrics.length > 0 && (
      <ul role="list" className="mt-2 flex flex-col gap-1">
        {job.metrics.map((m) => (
          <li
            key={m}
            className="relative pl-4 text-pretty before:absolute before:left-0 before:text-neutral-400 before:content-['•']"
          >
            {m}
          </li>
        ))}
      </ul>
    )}
  </article>
);

export { metadata };
export default ResumePage;
