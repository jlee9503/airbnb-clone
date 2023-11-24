"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="logo"
      height={50}
      width={100}
      src="/images/rent.png"
      className="cursor-pointer"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
