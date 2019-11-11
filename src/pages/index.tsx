import React, { FC } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Head from "../components/Head";
import ProfileImage from "../components/ProfileImage";
import { useStaticQuery, graphql } from "gatsby";

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

const Index: FC = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            name
            subtitles
          }
        }
      }
    `
  );

  return (
    <Layout>
      <Container>
        <Head />
        <ProfileImage />
        <Title>
          Hey 👋, my name is <Name>{site.siteMetadata.name}</Name>
        </Title>
        {site.siteMetadata.subtitles.map(subtitle => (
          <>
            <br />
            <SubTitle>{subtitle}</SubTitle>
          </>
        ))}
        <Navigation />
      </Container>
    </Layout>
  );
};

export default Index;
