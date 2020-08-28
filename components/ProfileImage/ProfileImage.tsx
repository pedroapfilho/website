import React, { FC } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  margin: 1em;
  border-radius: 0.5em;
`;

const ProfileImage: FC = () => {
  return (
    <picture>
      <source type="image/webp" srcSet="/profile.webp" />
      <StyledImage
        width="150"
        height="150"
        src="/profile.jpg"
        alt="Profile Image"
      />
    </picture>
  );
};

export default ProfileImage;
