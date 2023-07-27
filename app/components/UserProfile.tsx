"use client";

import Image from "next/image";

interface UserProfileProps {
  imgSrc: string | null | undefined;
}

const UserProfile = ({ imgSrc }: UserProfileProps) => {
  return (
    <Image
      alt="avatar"
      src={imgSrc || `/images/avatar.jpg`}
      className="rounded-full"
      width={30}
      height={30}
    />
  );
};

export default UserProfile;
