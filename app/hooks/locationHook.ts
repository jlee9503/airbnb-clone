import countries from "world-countries";

const locationData = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const locationHook = () => {
  const getAll = () => locationData;

  const getByValue = (val: string) => {
    return locationData.find((item) => item.value === val);
  };

  return { getAll, getByValue };
};

export default locationHook;
