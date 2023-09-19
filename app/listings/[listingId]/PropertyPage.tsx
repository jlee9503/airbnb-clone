"use client";

import Container from "@/app/components/Container";
import PropertyHead from "@/app/components/listings/PropertyHead";
import PropertyInfo from "@/app/components/listings/PropertyInfo";
import PropertyReservation from "@/app/components/listings/PropertyReservation";
import { categories } from "@/app/components/navbar/Categories";
import LogInModalHook from "@/app/hooks/loginInModalHook";
import { LoginUser, SafeListing, SafeReservation } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface PropertyPagesProps {
  reservation?: SafeReservation[];
  property: SafeListing & { user: LoginUser };
  currentUser?: LoginUser | null;
}

const PropertyClient = ({
  reservation = [],
  property,
  currentUser,
}: PropertyPagesProps) => {
  const [isloading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(property.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const loginModal = LogInModalHook();
  const router = useRouter();

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((reservationDate) => {
      const range = eachDayOfInterval({
        start: new Date(reservationDate.startDate),
        end: new Date(reservationDate.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservation]);

  const oncreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        propertyId: property?.id,
      })
      .then(() => {
        toast.success("Property reserved!");
        setDateRange(initialDateRange);

        router.push("/");
      })
      .catch((error: any) => {
        toast.error("Error on your reservation");
      });
  }, [totalPrice, dateRange, property?.id, router, currentUser, loginModal]);

  // calculate total price depends on how many dates user selected
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && property.price) {
        setTotalPrice(dayCount * property.price);
      } else {
        setTotalPrice(property.price);
      }
    }
  }, [dateRange, property.price]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === property.category);
  }, [property.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <PropertyHead
            title={property.title}
            locationVal={property.locationVal}
            id={property.id}
            imgSrc={property.imgSrc}
            currentUser={currentUser}
          />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <PropertyInfo
              user={property.user}
              description={property.description}
              guestCount={property.guestCount}
              roomCount={property.roomCount}
              bathroomCount={property.bathroomCount}
              category={category}
              locationVal={property.locationVal}
            />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <PropertyReservation
                price={property.price}
                dateRange={dateRange}
                totalPrice={totalPrice}
                onChangeDate={(val) => setDateRange(val)}
                onSubmit={() => {}}
                disabled={isloading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PropertyClient;
