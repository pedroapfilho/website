import { ScrambleText } from "./scramble-text";

const links = [
  { href: "https://github.com/pedroapfilho", label: "Code" },
  { href: "https://twitter.com/pedroapfilho", label: "Thoughts" },
  { href: "/resume.pdf", label: "Resume" },
  { href: "https://youtube.com/c/ohmyfunction", label: "Youtube" },
  { href: "mailto:pedro@filho.me", label: "Email" },
];

const Navigation = () => (
  <nav className="text-center w-full absolute right-0 left-0 bottom-0">
    <ul className="list-none max-xs:flex max-xs:justify-around">
      {links.map((link) => (
        <li key={link.href} className="inline-block">
          <ScrambleText trigger="hover">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link.href}
              className="block py-2 px-2 m-2 max-xs:m-1 font-normal no-underline text-inherit rounded-lg transition-all duration-200 hover:text-primary hover:bg-primary-foreground"
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
