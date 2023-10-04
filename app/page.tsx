import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PropertyCard from "./components/listings/PropertyCard";

interface HomePageProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomePageProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const listingEmpty = true;

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing: any) => (
          <PropertyCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
