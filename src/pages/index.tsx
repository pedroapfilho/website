import React, { FC } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Head from "../components/Head";
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
  font-weight: lighter;
`;

const SubTitle = styled.h4`
  font-weight: lighter;
`;

const Name = styled.span`
  font-weight: normal;
`;

const Index: FC<{ data: any }> = ({ data }) => (
  <Layout>
    <Container>
      <Head />
      <ProfileImage />
      <Title>
        Hey 👋, my name is <Name>Pedro</Name>
      </Title>
      <br />
      <SubTitle>I&apos;m a Software Engineer</SubTitle>
      <br />
      <span>🇧🇷 🇵🇹 🇳🇱 🇬🇧</span>
      <Navigation />
    </Container>
  </Layout>
);

export default Index;
