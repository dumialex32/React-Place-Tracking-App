import { useContext } from "react";
import { CitiesContext } from "./CitiesContext";

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error(
      "The values from the CityContext are used on a component outside of the context"
    );

  return context;
}

export default useCities;
