"use client";

import SearchModalHook from "@/app/hooks/searchModalHook";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import Heading from "../Heading";
import Location, { LocationData } from "../inputs/Location";
import Modal from "./Modal";
import Map from "../Map";
import { ST } from "next/dist/shared/lib/utils";
import Calendar from "../inputs/Calendar";
import Conuter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = SearchModalHook();
  const router = useRouter();
  const params = useSearchParams();

  const [steps, setSteps] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [location, setLocation] = useState<LocationData>();

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const goBack = useCallback(() => {
    setSteps((value) => value - 1);
  }, []);

  const goNext = useCallback(() => {
    setSteps((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (steps !== STEPS.INFO) {
      return goNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setSteps(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    steps,
    params,
    location?.value,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange.startDate,
    dateRange.endDate,
    searchModal,
    router,
    goNext,
  ]);

  const actionLabel = useMemo(() => {
    if (steps === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [steps]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find your location!"
      />
      <Location
        value={location}
        onChange={(value) => setLocation(value as LocationData)}
      />
      <hr />
      <Map position={location?.latlng} />
    </div>
  );

  if (steps === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Conuter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Conuter
          title="Guests"
          subtitle="How many rooms are coming?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Conuter
          title="Guests"
          subtitle="How many bathrooms are coming?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={steps === STEPS.LOCATION ? undefined : goBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
