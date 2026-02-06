import { ScrambleText } from "./scramble-text";

const links = [
  { href: "https://github.com/pedroapfilho", label: "Code" },
  { href: "https://x.com/pedroapfilho", label: "X" },
  { href: "/resume.pdf", label: "Resume" },
  { href: "https://youtube.com/c/ohmyfunction", label: "Youtube" },
  { href: "mailto:pedro@filho.me", label: "Email" },
];

const Navigation = () => (
  <nav className="w-full absolute inset-x-0 bottom-0">
    <ul className="flex flex-wrap justify-center gap-1">
      {links.map((link) => (
        <li key={link.href} className="inline-block">
          <ScrambleText trigger="hover">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link.href}
              className="block p-2 font-normal no-underline text-inherit rounded-lg transition-all duration-200 hover:text-primary hover:bg-primary-foreground"
            >
              {link.label}
            </a>
          </ScrambleText>
        </li>
      ))}
    </ul>
  </nav>
);

export { Navigation };
