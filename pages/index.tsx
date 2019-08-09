import styled from "styled-components";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import SEO from "../components/SEO";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`;

const Title = styled.h1`
  font-weight: lighter;
  font-size: 2em;
`;

const Name = styled.span`
  font-weight: normal;
`;

const Index = () => (
  <Layout>
    <Container>
      <SEO />
      <Title>
        Hey 👋, I'm <Name>Pedro</Name>
      </Title>
      <Navigation />
    </Container>
  </Layout>
);

export default Index;
