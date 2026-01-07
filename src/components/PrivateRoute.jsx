// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // vérifie si l'utilisateur est connecté
  return token ? children : <Navigate to="/login" replace />; // redirige sinon
};

export default PrivateRoute;
