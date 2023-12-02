/* eslint-disable react/prop-types */
import { useEffect, createContext, useReducer, useCallback } from "react";
import { AJAX } from "../helpers";
import { BASE_URL } from "../config";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(currentCity);
  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const data = await AJAX(`${BASE_URL}/cities`, "GET");

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "rejected", payload: err.message });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        const data = await AJAX(`${BASE_URL}/cities/${id}`);
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "rejected", payload: err.message });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const data = await AJAX(`${BASE_URL}/cities`, "POST", newCity);

      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({
        type: "rejected",
        payload: "There was an error creating city",
      });
    }
  }

  async function removeCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await AJAX(`${BASE_URL}/cities/${id}`, "DELETE");

      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      console.error(err);
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        onGetCity: getCity,
        onCreateCity: createCity,
        onRemoveCity: removeCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
