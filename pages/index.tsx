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

const Home = () => (
  <>
    <Head>
      <title>Pedro Filho - Software Engineer</title>
      <meta name="description" content="Likes to write code sometimes" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://pedroapfilho.com" />
      <meta name="twitter:title" content="Pedro Filho - Software Engineer" />
      <meta
        name="twitter:description"
        content="Likes to write code sometimes"
      />
      <meta
        name="twitter:image"
        content="https://pedroapfilho.com/profile.jpg"
      />
      <meta name="twitter:creator" content="@pedroapfilho" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Pedro Filho - Software Engineer" />
      <meta property="og:description" content="Likes to write code sometimes" />
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
          <b>gm</b> 👋, I'm <b>Pedro</b>
        </Title>
        <br />
        <SubTitle>I like to write code sometimes</SubTitle>
        <Navigation />
      </Container>
    </Layout>
  </>
);

export default Home;
