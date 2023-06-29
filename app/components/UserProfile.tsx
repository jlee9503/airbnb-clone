"use client";

import Image from "next/image";

const UserProfile = () => {
  return (
    <Image
      alt="avatar"
      src="/images/avatar.jpg"
      className="rounded-full"
      width={30}
      height={30}
    />
  );
};

export default UserProfile;
