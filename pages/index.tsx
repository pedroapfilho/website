import React, { FC } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Head from "next/head";
import ProfileImage from "../components/ProfileImage";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: lighter;
`;

const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: lighter;
`;

const Flags = styled.p``;

const Name = styled.span`
  font-weight: normal;
`;

const Company = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: normal;
`;

const Index: FC = () => (
  <>
    <Head>
      <title>Pedro Filho - Software Engineer</title>

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="Curious by nature, entrepreneur and JavaScript enthusiast."
        key="twcard"
      />
      <meta name="twitter:creator" content="@pedrofilhome" key="twhandle" />

      {/* Open Graph */}
      <meta property="og:url" content="https://pedroapfilho.com" key="ogurl" />
      <meta property="og:image" content="/profile.jpg" key="ogimage" />
      <meta
        property="og:site_name"
        content="Software Engineer"
        key="ogsitename"
      />
      <meta property="og:title" content="Pedro Filho" key="ogtitle" />
      <meta
        property="og:description"
        content="Curious by nature, entrepreneur and JavaScript enthusiast."
        key="ogdesc"
      />
    </Head>
    <Layout>
      <Container>
        <ProfileImage />
        <Title>
          Hey 👋, my name is <Name>Pedro</Name>
        </Title>
        <br />
        <SubTitle>
          I'm a Software Engineer at{" "}
          <Company
            href="https://gameanalytics.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Game Analytics
          </Company>
        </SubTitle>
        <br />
        <Flags>🇧🇷 🇵🇹 🇳🇱 🇬🇧</Flags>
        <Navigation />
      </Container>
    </Layout>
  </>
);

export default Index;
