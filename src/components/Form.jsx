import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCities } from "./contexts/useCities";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-EN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

function Form() {
  const navigate = useNavigate();
  const { onSetCities } = useCities();
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(() => new Date());
  const [searchParams, setSearchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  console.log(mapLat);
  console.log(mapLng);

  function handleAddCity(e) {
    e.preventDefault();
    const newCity = {
      cityName: city,
      date: date.toISOString(),
      notes: notes,
      position: { lat: mapLat, lng: mapLng },
      id: crypto.randomUUID(),
    };
    onSetCities((cities) => [...cities, newCity]);
  }

  return (
    <form onSubmit={(e) => handleAddCity(e)}>
      <label htmlFor="city">City name</label>
      <input
        id="city"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      ></input>

      <label htmlFor="date">When did you go to ?</label>
      <input
        id="date"
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      ></input>

      <label htmlFor="notes">Notes about your trip to</label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>

      <div className={styles.formBtnContainer}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
