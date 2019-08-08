import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: ${props => props.theme.primary};
  font-size: 1em;
`;

export default () => <Title>My page</Title>;
