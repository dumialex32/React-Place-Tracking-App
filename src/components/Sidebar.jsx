import { Outlet } from "react-router";
import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";
import { CitiesProvider } from "./contexts/CitiesContext";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <CitiesProvider>
        <Outlet />
      </CitiesProvider>
      <Footer />
    </div>
  );
}

export default Sidebar;
