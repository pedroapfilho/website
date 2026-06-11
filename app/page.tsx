import Image from "next/image";
import profileImage from "./profile.jpg";

const Home = () => (
  <main className="isolate flex flex-1 flex-col">
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8">
      <div className="m-4 overflow-hidden rounded-lg">
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
        <h1 className="text-2xl tracking-tight text-balance">
          <span className="font-semibold">gm</span>, I&apos;m Pedro.
        </h1>

        <h2 className="text-base">
          I like to write code <i>sometimes</i>.
        </h2>
      </div>

      <div className="max-w-xl text-center">
        <p className="text-base text-pretty sm:text-sm">
          Usually I work on the crypto space, as a product engineer, but you can
          find me working on other projects as well, <i>just for fun</i>.
        </p>
      </div>
    </div>
  </main>
);

export default Home;
