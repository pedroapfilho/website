import { Navigation } from "@/components/navigation";
import { ProfileImage } from "@/components/profile-image";

const Home = () => (
  <main className="flex flex-col items-center justify-center relative h-full gap-8">
    <ProfileImage />

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

    <Navigation />
  </main>
);

export default Home;
