/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";
import { AJAX } from "../helpers";
import { BASE_URL } from "../config";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function getCity(id) {
    try {
      setIsLoading(true);
      const data = await AJAX(`${BASE_URL}/cities/${id}`);
      console.log(data);
      setCurrentCity(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        onSetCities: setCities,
        isLoading,
        onSetIsLoading: setIsLoading,
        onSetCurrentCity: setCurrentCity,
        currentCity,
        onGetCity: getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
