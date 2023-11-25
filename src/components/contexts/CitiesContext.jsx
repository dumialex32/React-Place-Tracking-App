/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";
import { AJAX } from "../helpers";
import { BASE_URL } from "../config";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  console.log(cities);
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("No fetch data has been found");

        const data = await res.json();

        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

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

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const data = await AJAX(`${BASE_URL}/cities`, newCity);
      console.log(data);

      setCities((cities) => [...cities, data]);
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
        onCreateCity: createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
