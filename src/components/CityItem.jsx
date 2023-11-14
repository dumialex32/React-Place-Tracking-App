import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

CityItem.propTypes = {
  city: PropTypes.object,
};

function CityItem({ city }) {
  const { cityName, country, emoji, date, id, position } = city;

  const { lat, lng } = position;
  console.log(lat);
  console.log(lng);
  {
    return (
      <li>
        <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>{formatDate(date)}</time>
          <button className={styles.deleteBtn}>&times;</button>
        </Link>
      </li>
    );
  }
}

export default CityItem;
