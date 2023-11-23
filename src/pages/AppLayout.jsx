import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import { CitiesProvider } from "../components/contexts/CitiesContext";

function AppLayout() {
  return (
    <div className={styles.app}>
      <CitiesProvider>
        <Sidebar />
        <Map />
      </CitiesProvider>
    </div>
  );
}

export default AppLayout;
