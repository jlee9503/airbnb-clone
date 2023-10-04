"use client";

import locationHook from "@/app/hooks/locationHook";
import { LoginUser, SafeListing, SafeReservation } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import FavoriteButton from "../FavoriteButton";
import Button from "../Button";

interface PropertyCardProps {
  data: Listing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: LoginUser | null;
}

const PropertyCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: PropertyCardProps) => {
  const router = useRouter();

  const { getByValue } = locationHook();
  const location = getByValue(data.locationVal);

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="cursor-pointer col-span-1 group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="w-full aspect-square relative overflow-hidden rounded-xl">
        <Image
          src={data.imgSrc}
          alt="Listing"
          className="object-cover w-full h-full transition group-hover:scale-110"
          fill
        />

        <div className="absolute top-3 right-3">
          <FavoriteButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>

      <div className="font-semibold text-lg">
        {location?.region}, {location?.label}
      </div>

      <div className="font-light text-neutral-500">
        {reservationDate || data.category}
      </div>

      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">${price}</div>
        {!reservation && <div className="font-light">night</div>}
      </div>

      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default PropertyCard;
