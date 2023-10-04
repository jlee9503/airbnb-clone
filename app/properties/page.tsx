import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  const properties = await getListings({userId: currentUser?.id});

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login or Create a new account"
      />
    );
  }

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    );
  }
  return <PropertiesClient properties={properties} currentUser={currentUser} />;
};

export default PropertiesPage;
