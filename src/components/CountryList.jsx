import styles from "./CountryList.module.css";
import PropTypes from "prop-types";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

function CountryList({ cities, isLoading }) {
  const countries = cities.reduce(
    (arr, city) =>
      arr.find((el) => el.country === city.country)
        ? arr
        : arr.concat({ country: city.country, emoji: city.emoji }),
    []
  );
  console.log(countries);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <ul className={styles.countryList}>
          {countries.map((country, i) => (
            <CountryItem key={i} country={country} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CountryList;
