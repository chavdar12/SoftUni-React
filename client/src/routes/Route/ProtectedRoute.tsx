import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

type DecodedToken = {
  exp: number;
};

const hasValidToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    return decodedToken.exp > currentTimestamp;
  } catch (error) {
    return false;
  }
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!hasValidToken()) {
    return <Navigate to="/login" />;
  }

  return { children };
}

export default ProtectedRoute;
