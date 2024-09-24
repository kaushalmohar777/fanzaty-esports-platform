import { Navigate } from "react-router-dom";
import { getLocalStorageData } from "../shared/commonFunction";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(getLocalStorageData("token"));

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
