import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useCities } from "./contexts/useCities";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { AJAX, formatDate, getFlagEmoji } from "./helpers";
import { latLng } from "leaflet";
import { HERE_GEO_API_KEY } from "./config";
import ButtonBack from "./ButtonBack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "./config";

function Form() {
  const navigate = useNavigate();
  const { onSetCities, onCreateCity, isLoading } = useCities();
  const [city, setCity] = useState("");
  // const [curCity, setCurCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(() => new Date());
  const [mapLat, mapLng, setQueryParams] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  console.log(city);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!city || !date) return;
    const newCity = {
      cityName: city,
      country: country,
      emoji: getFlagEmoji(countryCode),
      date: date.toISOString(),
      notes: notes,
      position: { lat: mapLat, lng: mapLng },
      // id: crypto.randomUUID(),
    };
    await onCreateCity(newCity);

    navigate("/app/cities");
  }

  useEffect(() => {
    if (!mapLat && !mapLng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const data = await AJAX(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}&localityLanguage=en`
        );

        if (!data.countryCode)
          throw new Error(
            "This does not seem to be a city, please click somewhere else."
          );

        setCity(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (err) {
        console.error(err);
        setGeocodingError(err.message);
      }
    }

    fetchCityData();
  }, [mapLat, mapLng]);

  if (geocodingError)
    return (
      <>
        <Message message={geocodingError} />
        <ButtonBack />
      </>
    );
  if (!mapLat && !mapLng) return <Message message="Please select a city" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="city">City name</label>
        <input
          id="city"
          type="text"
          value={city}
          // onChange={(e) => setCurCity(e.target.value)}
        ></input>
        <span className={styles.flag}>{countryCode}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to ?</label>
        {/* <input
          id="date"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.buttons}>
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
