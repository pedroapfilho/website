import Image from "next/image";

import { PageTitle } from "./poster";
import profileImage from "./profile.jpg";

const Home = () => (
  <>
    <PageTitle>
      <b className="font-bold">gm</b>, I&apos;m Pedro.
    </PageTitle>

    <div className="col-span-full mt-10 flex flex-col gap-3 text-sm leading-6 text-pretty lg:col-start-5 lg:col-end-9 lg:mt-16">
      <p>
        I like to write code <i>sometimes</i>.
      </p>
      <p>
        Usually I work on the crypto space, as a product engineer, but you can find me working on
        other projects as well, <i>just for fun</i>.
      </p>
    </div>

    <Image
      alt="Pedro Filho"
      className="col-span-full mt-8 grayscale lg:col-start-11 lg:col-end-13 lg:mt-17 lg:justify-self-end"
      fetchPriority="high"
      height={120}
      loading="eager"
      placeholder="blur"
      src={profileImage}
      width={120}
    />
  </>
);

export const instant = true;

export default Home;
