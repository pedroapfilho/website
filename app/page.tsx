import Image from "next/image";
import Link from "next/link";
import profileImage from "./profile.jpg";

const Home = () => (
  <main className="flex flex-col items-center justify-center relative min-h-dvh gap-8 px-4 py-8">
    <div className="rounded-lg overflow-hidden m-4">
      <Image
        width={128}
        height={128}
        src={profileImage}
        alt="Profile Image"
        priority
        fetchPriority="high"
        placeholder="blur"
      />
    </div>

    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl">
        <b>gm</b> 👋, I&apos;m <b>Pedro</b>.
      </h1>

      <h2 className="text-base">
        I like to write code <i>sometimes</i>.
      </h2>
    </div>

    <div className="text-center max-w-xl">
      <p className="text-sm">
        Usually I work on the crypto space, as a product engineer, but you can
        find me working on other projects as well, <i>just for fun</i>.
      </p>
    </div>

    <nav className="w-full absolute inset-x-0 bottom-0">
      <ul className="flex flex-wrap justify-center gap-3 py-4">
        <li className="inline-block">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/pedroapfilho"
            className="block p-2 font-normal no-underline text-inherit rounded-lg transition-all duration-200 hover:text-primary hover:bg-primary-foreground"
          >
            Code
          </a>
        </li>
        <li className="inline-block">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/pedroapfilho"
            className="block p-2 font-normal no-underline text-inherit rounded-lg transition-all duration-200 hover:text-primary hover:bg-primary-foreground"
          >
            X
          </a>
        </li>
        <li className="inline-block">
          <Link
            href="/resume"
            className="block p-2 font-normal no-underline text-inherit rounded-lg transition-all duration-200 hover:text-primary hover:bg-primary-foreground"
          >
            Resume
          </Link>
        </li>
        <li className="inline-block">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://youtube.com/c/ohmyfunction"
            className="block p-2 font-normal no-underline text-inherit rounded-lg transition-all duration-200 hover:text-primary hover:bg-primary-foreground"
          >
            Youtube
          </a>
        </li>
        <li className="inline-block">
          <a
            href="mailto:pedro@filho.me"
            className="block p-2 font-normal no-underline text-inherit rounded-lg transition-all duration-200 hover:text-primary hover:bg-primary-foreground"
          >
            Email
          </a>
        </li>
      </ul>
    </nav>
  </main>
);

export default Home;
