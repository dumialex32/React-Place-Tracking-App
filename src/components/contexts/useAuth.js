import { AuthContext } from "./FakeAuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext used outside of the AuthProvider");
  return context;
}
