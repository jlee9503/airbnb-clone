"use client";

import locationHook from "@/app/hooks/locationHook";
import SearchModalHook from "@/app/hooks/searchModalHook";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Searchbar = () => {
  const searchModal = SearchModalHook();
  const params = useSearchParams();
  const { getByValue } = locationHook();

  const locationVal = params?.get("locationVal");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationVal) {
      return getByValue(locationVal as string)?.label;
    }
    return "Anywhere";
  }, [getByValue, locationVal]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diffDays = differenceInDays(end, start);
      if (diffDays === 0) {
        diffDays = 1;
      }
      return `${diffDays} Days`;
    }
    return "Any Week";
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      className="w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md cursor-pointer transition border-[1px] xl:ml-40 ml-0"
      onClick={searchModal.onOpen}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="text-sm font-semibold px-6 hidden sm:block border-x-[1px]">
          {durationLabel}
        </div>
        <div className="text-sm text-gray-600 flex items-center pl-6 pr-2 gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 rounded-full text-white bg-rose-500">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
