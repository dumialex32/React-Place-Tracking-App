import styles from "./Button.module.css";
import PropTypes from "prop-types";
console.log(styles);

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

function Button({ children, type, onClick }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`}>{children}</button>
  );
}

export default Button;
