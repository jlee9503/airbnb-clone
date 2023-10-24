'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import PropertyCard from "../components/listings/PropertyCard";
import { LoginUser, SafeListing } from "../types"

interface PropertiesClientProps {
  properties: SafeListing[];
  currentUser?: LoginUser | null;
}

const PropertiesClient = ({ properties, currentUser }: PropertiesClientProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property deleted");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.err);
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            data={property}
            actionId={property.id}
            onAction={onCancel}
            disabled={deleteId === property.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient