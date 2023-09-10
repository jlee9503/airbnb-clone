"use client";

import locationHook from "@/app/hooks/locationHook";
import { LoginUser } from "@/app/types";
import Image from "next/image";
import FavoriteButton from "../FavoriteButton";
import Heading from "../Heading";

interface PropertyHeadProps {
  title: string;
  locationVal: string;
  imgSrc: string;
  id: string;
  currentUser?: LoginUser | null;
}

const PropertyHead = ({
  title,
  locationVal,
  imgSrc,
  id,
  currentUser,
}: PropertyHeadProps) => {
  const { getByValue } = locationHook();
  const location = getByValue(locationVal);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="w-full h-[60vh] relative overflow-hidden rounded-xl">
        <Image
          src={imgSrc}
          alt="Property"
          className="object-cover w-full"
          fill
        />

        <div className="absolute top-5 right-5">
          <FavoriteButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default PropertyHead;
