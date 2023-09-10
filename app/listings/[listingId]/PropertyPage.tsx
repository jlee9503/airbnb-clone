"use client";

import Container from "@/app/components/Container";
import PropertyHead from "@/app/components/listings/PropertyHead";
import PropertyInfo from "@/app/components/listings/PropertyInfo";
import { categories } from "@/app/components/navbar/Categories";
import { LoginUser, SafeListing, SafeReservation } from "@/app/types";
import { useMemo } from "react";

interface PropertyPagesProps {
  reservation?: SafeReservation[];
  property: SafeListing & { user: LoginUser };
  currentUser?: LoginUser | null;
}

const PropertyClient = ({
  reservation,
  property,
  currentUser,
}: PropertyPagesProps) => {
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

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6">
            <PropertyInfo
              user={property.user}
              description={property.description}
              guestCount={property.guestCount}
              roomCount={property.roomCount}
              bathroomCount={property.bathroomCount}
              category={category}
              locationVal={property.locationVal}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PropertyClient;
