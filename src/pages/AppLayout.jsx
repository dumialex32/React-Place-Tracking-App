import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import { CitiesProvider } from "../components/contexts/CitiesContext";
import User from "../components/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <CitiesProvider>
        <Sidebar />
        <Map />
        <User />
      </CitiesProvider>
    </div>
  );
}

export default AppLayout;
