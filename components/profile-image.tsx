import Image from "next/image";

const ProfileImage = () => {
  return (
    <div className="rounded-lg overflow-hidden m-4">
      <Image
        width={150}
        height={150}
        src="/profile.jpg"
        alt="Profile Image"
        priority
      />
    </div>
  );
};

export default ProfileImage;
