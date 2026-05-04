import type { Metadata } from "next";
import Link from "next/link";
import { type Job, resume } from "./data";

const metadata: Metadata = {
  title: `${resume.name} — Resume`,
  description: resume.title,
};

const ResumePage = () => (
  <article className="mx-auto max-w-[760px] px-6 py-10 sm:px-12 sm:py-14 print:max-w-none print:p-0 text-[0.9375rem] leading-6">
    <div className="mb-10 flex items-center justify-between text-sm text-zinc-500 print:hidden">
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
    </div>

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
        <span className="text-zinc-500"> · </span>
        {resume.education.school}
      </p>
    </Section>

    <Section title="Languages">
      <ul role="list" className="grid grid-cols-[max-content_1fr] gap-x-6">
        {resume.languages.map((l) => (
          <li key={l.language} className="contents">
            <span className="text-zinc-500">{l.language}</span>
            <span>{l.level}</span>
          </li>
        ))}
      </ul>
    </Section>
  </article>
);

const Header = () => (
  <header className="break-inside-avoid">
    <h1 className="text-3xl font-medium tracking-tight text-balance">
      {resume.name}
    </h1>
    <p className="mt-1 text-zinc-500">{resume.title}</p>

    <ul
      role="list"
      className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2"
    >
      {resume.contacts.map((c) => (
        <li key={c.href} className="grid grid-cols-[5rem_1fr] items-baseline">
          <span className="text-xs uppercase tracking-wide text-zinc-500">
            {c.label}
          </span>
          <a
            href={c.href}
            className="underline decoration-zinc-300 underline-offset-2 hover:decoration-primary-foreground break-words"
          >
            {c.display}
          </a>
        </li>
      ))}
    </ul>
  </header>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-9">
    <div className="break-inside-avoid">
      <h2 className="text-xs uppercase tracking-wide font-medium text-zinc-500">
        {title}
      </h2>
      <hr className="mt-2 mb-4 border-t border-zinc-200" />
    </div>
    {children}
  </section>
);

const Skills = () => (
  <dl className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-[max-content_1fr]">
    {resume.skills.map((s) => (
      <div key={s.label} className="contents">
        <dt className="text-zinc-500 sm:whitespace-nowrap">{s.label}</dt>
        <dd className="text-pretty">{s.items.join(" · ")}</dd>
      </div>
    ))}
  </dl>
);

const JobEntry = ({ job }: { job: Job }) => (
  <article>
    <div className="break-inside-avoid">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-medium">{job.company}</h3>
        <span className="tabular-nums text-zinc-500">{job.dates}</span>
      </header>

      <p className="text-zinc-500">
        {job.role}
        <span className="text-zinc-300"> · </span>
        {job.location}
      </p>

      <p className="mt-1 italic text-zinc-700">{job.product}</p>

      <ul role="list" className="mt-2 flex flex-wrap gap-x-1.5 gap-y-1">
        {job.stack.map((t) => (
          <li
            key={t}
            className="rounded border border-zinc-200 px-1.5 py-0.5 text-xs text-zinc-600"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>

    <p className="mt-3 text-pretty">{job.description}</p>
  </article>
);

export { metadata };
export default ResumePage;
