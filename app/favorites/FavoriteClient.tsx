import React from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import PropertyCard from "../components/listings/PropertyCard";
import { LoginUser, SafeListing } from "../types";

interface FavoriteClientProps {
  properties: SafeListing[];
  currentUser?: LoginUser | null;
}

const FavoriteClient = ({ properties, currentUser }: FavoriteClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            data={property}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
