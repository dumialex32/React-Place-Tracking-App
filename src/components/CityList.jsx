import PropTypes from "prop-types";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import useCities from "./contexts/useCities";
import { useEffect } from "react";
import { BASE_URL } from "./config";

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

function CityList() {
  const { cities, isLoading, onSetIsLoading, onSetCities } = useCities();

  useEffect(() => {
    async function fetchCities() {
      try {
        onSetIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("No fetch data has been found");

        const data = await res.json();

        onSetCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        onSetIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message={"Add your first city!"} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
