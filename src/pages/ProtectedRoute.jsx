/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/useAuth";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthentificated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentificated) navigate("/");
  }, [isAuthentificated, navigate]);

  return isAuthentificated ? children : null;
}

export default ProtectedRoute;
