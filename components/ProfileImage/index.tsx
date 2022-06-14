import styled from "styled-components";
import Image from "next/image";

const ImageContainer = styled.div`
  border-radius: 0.5em;
  overflow: hidden;
  margin: 1em;
`;

const ProfileImage = () => {
  return (
    <ImageContainer>
      <Image
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
