import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { formatDate } from "./../helpers";
import Button from "./Button";
import useCities from "./contexts/useCities";
import Spinner from "./Spinner";

function City() {
  const { currentCity, isLoading, onGetCity } = useCities();
  const { id } = useParams(); // url param

  const navigate = useNavigate();

  useEffect(() => {
    onGetCity(id);
  }, [id, onGetCity]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {cityName} <span>{emoji}</span>
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find more about {cityName} on Wikipedia
        </a>
      </div>

      <div>
        <Button type="back" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
