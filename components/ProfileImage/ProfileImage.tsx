import styled from "styled-components";
import { FC } from "react";

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  margin: 1em;
  border-radius: 0.5em;
`;

const ProfileImage: FC = () => <StyledImage src="/static/profile-image.jpg" />;

export default ProfileImage;
