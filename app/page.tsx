import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PropertyCard from "./components/listings/PropertyCard";

export default async function Home() {
  const listings = await getListings();
  const listingEmpty = true;

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <PropertyCard data={listings} />
      </div>
    </Container>
  );
}
