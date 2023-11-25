import { useParams, useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  console.log(lat, lng);

  function setQueryParams(paramsObject) {
    const newParams = new URLSearchParams(searchParams);
    console.log(paramsObject);

    // Update multiple key-value pairs
    Object.entries(paramsObject).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    // Update the state with the new URLSearchParams object
    setSearchParams(newParams);
  }

  return [+lat, +lng, setQueryParams];
}
