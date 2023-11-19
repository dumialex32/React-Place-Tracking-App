import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "./City.module.css";
import { useDebugValue, useEffect, useState } from "react";
import { AJAX } from "./helpers";
import Button from "./Button";
import useCities from "./contexts/useCities";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const {
    currentCity,
    isLoading,

    onGetCity,
  } = useCities();
  const { id } = useParams(); // url param
  const [searchParams, setSearchParams] = useSearchParams(); // query string

  const navigate = useNavigate();

  useEffect(() => {
    onGetCity(id);
  }, [id]);

  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
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
