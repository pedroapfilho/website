import styled from "styled-components";
import Image from "next/image";

const StyledImage = styled(Image)`
  border-radius: 0.5em;
`;

const ImageContainer = styled.div`
  margin: 1em;
`;

const ProfileImage = () => {
  return (
    <ImageContainer>
      <StyledImage
        width={150}
        height={150}
        src="/profile.jpg"
        alt="Profile Image"
        priority
      />
    </ImageContainer>
  );
};

export default ProfileImage;
