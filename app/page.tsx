import Layout from "@/components/layout";
import Navigation from "@/components/navigation";
import ProfileImage from "@/components/profile-image";

const Home = () => (
  <Layout>
    <section className="flex flex-col items-center justify-center relative h-full">
      <ProfileImage />
      <h1 className="text-2xl font-normal">
        <b>gm</b> 👋, I&apos;m <b>Pedro</b>
      </h1>
      <br />
      <h2 className="text-base font-normal">I like to write code sometimes</h2>
      <Navigation />
    </section>
  </Layout>
);

export default Home;
