import styled from "styled-components";
import Image from "next/image";

const ImageContainer = styled.div`
  border-radius: 0.5em;
  overflow: hidden;
  margin: 1em;
  width: 150px;
  height: 150px;
`;

const ProfileImage = () => {
  return (
    <ImageContainer>
      <Image
        width={300}
        height={300}
        src="/profile.jpg"
        alt="Profile Image"
        priority
      />
    </ImageContainer>
  );
};

export default ProfileImage;
