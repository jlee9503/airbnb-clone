import getCurrentUser from "@/app/actions/getCurrentUser";
import getPropertyById from "@/app/actions/getPropertyById";
import EmptyState from "@/app/components/EmptyState";
import PropertyClient from "./PropertyPage";

interface IParams {
  listingId?: string;
}
const PropertyPage = async ({ params }: { params: IParams }) => {
  const property = await getPropertyById(params);
  const currentUser = await getCurrentUser();

  if (!property) {
    return (
      <EmptyState />
    )
  }
  return (
    <PropertyClient property={property} currentUser={currentUser} />
  )
}

export default PropertyPage;