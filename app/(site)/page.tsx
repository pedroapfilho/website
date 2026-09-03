import Image from "next/image";

import profileImage from "./profile.jpg";

const Home = () => (
  <>
    <h1 className="col-span-full mt-16 text-[clamp(4.5rem,10.2vw,9.375rem)] leading-[0.92] tracking-[-0.035em] text-balance sm:mt-24">
      <b className="font-bold">gm</b>, I&apos;m Pedro.
    </h1>

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
      className="col-span-full mt-8 grayscale lg:col-start-11 lg:col-end-13 lg:mt-[4.3125rem] lg:justify-self-end"
      fetchPriority="high"
      height={120}
      placeholder="blur"
      priority
      src={profileImage}
      width={120}
    />
  </>
);

export const instant = true;

export default Home;
