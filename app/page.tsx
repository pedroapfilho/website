import { Navigation } from "@/components/navigation";
import { ProfileImage } from "@/components/profile-image";
import { ScrambleText } from "@/components/scramble-text";

const Home = () => (
  <main className="flex flex-col items-center justify-center relative h-full gap-8">
    <ProfileImage />

    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl">
        <ScrambleText>
          <b>gm</b>
        </ScrambleText>{" "}
        👋, I&apos;m{" "}
        <ScrambleText>
          <b>Pedro</b>.
        </ScrambleText>
      </h1>

      <h2 className="text-base">
        <ScrambleText>
          I like to write code <i>sometimes</i>.
        </ScrambleText>
      </h2>
    </div>

    <div className="max-w-xl">
      <p className="text-sm">
        <ScrambleText cycles={1} interval={30}>
          Usually I work on the crypto space, as a full-stack software engineer,
          but you can find me working on other projects as well,
          <i>just for fun</i>.
        </ScrambleText>
      </p>
    </div>

    <Navigation />
  </main>
);

export default Home;
