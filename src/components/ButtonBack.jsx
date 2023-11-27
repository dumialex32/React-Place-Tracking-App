/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack({ navigateTo }) {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(navigateTo);
      }}
    >
      Back
    </Button>
  );
}

export default ButtonBack;
