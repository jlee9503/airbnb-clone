"use client";

import locationHook from "@/app/hooks/locationHook";
import { LoginUser } from "@/app/types";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import UserProfile from "../UserProfile";
import PropertyCategory from "./PropertyCategory";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface PropertyInfoProps {
  user: LoginUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationVal: string;
  category: { icon: IconType; label: string; description: string } | undefined;
}

const PropertyInfo = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationVal,
  category,
}: PropertyInfoProps) => {
  const { getByValue } = locationHook();
  const coordinates = getByValue(locationVal)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl flex flex-row items-center font-semibold gap-2">
          <div>Hosted by {user?.name}</div>
          <UserProfile imgSrc={user?.image} />
        </div>

        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {category && (
        <PropertyCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />

      <div className="text-lg font-light text-neutral-500">{description}</div>

      <hr />

      <div className="w-1/2">
        <Map position={coordinates} />
      </div>
    </div>
  );
};

export default PropertyInfo;
