import Image from "next/image";
import profileImage from "./image.jpg";

const ProfileImage = () => {
  return (
    <div className="rounded-lg overflow-hidden m-4">
      <Image
        width={128}
        height={128}
        src={profileImage}
        alt="Profile Image"
        priority
        fetchPriority="high"
        placeholder="blur"
      />
    </div>
  );
};

export { ProfileImage };
