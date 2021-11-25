import React from "react";
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
  font-weight: normal;
`;

const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: normal;
`;

const Name = styled.span`
  font-weight: bold;
`;

const ExternalLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: bold;
`;

const Home = () => (
  <>
    <Head>
      <title>Pedro Filho - Software Engineer</title>
      <meta
        name="description"
        content="Curious by nature, entrepreneur and JavaScript enthusiast."
      />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://pedroapfilho.com" />
      <meta name="twitter:title" content="Pedro Filho - Software Engineer" />
      <meta
        name="twitter:description"
        content="Curious by nature, entrepreneur and JavaScript enthusiast."
      />
      <meta
        name="twitter:image"
        content="https://pedroapfilho.com/profile.jpg"
      />
      <meta name="twitter:creator" content="@pedroapfilho" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Pedro Filho - Software Engineer" />
      <meta
        property="og:description"
        content="Curious by nature, entrepreneur and JavaScript enthusiast."
      />
      <meta property="og:site_name" content="Pedro Filho - Software Engineer" />
      <meta property="og:url" content="https://pedroapfilho.com" />
      <meta
        property="og:image"
        content="https://pedroapfilho.com/profile.jpg"
      />
    </Head>
    <Layout>
      <Container>
        <ProfileImage />
        <Title>
          Hey 👋, I'm <Name>Pedro</Name>
        </Title>
        <br />
        <SubTitle>
          Software Engineer at{" "}
          <ExternalLink
            href="https://blockchain.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blockchain.com
          </ExternalLink>
        </SubTitle>
        <Navigation />
      </Container>
    </Layout>
  </>
);

export default Home;
