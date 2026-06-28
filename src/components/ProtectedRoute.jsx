import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  if (!auth) {
    return <div>AuthProvider Missing</div>;
  }

  const { user } = auth;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}