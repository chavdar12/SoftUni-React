import { useUserRole } from "#hooks";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { role } = useUserRole();

  if (!allowedRoles.includes(role!)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
