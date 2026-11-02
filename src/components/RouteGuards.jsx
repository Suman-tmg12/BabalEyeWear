// src/components/RouteGuards.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

// For pages that need an account (profile, checkout...).
// Logged-out visitors go to Login, then come back to the page they wanted.
export function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/Auth/Login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  return children;
}

// For Login and Register. Logged-in users have no reason to see them.
export function GuestRoute({ children }) {
  if (isLoggedIn()) return <Navigate to="/UserProfile" replace />;
  return children;
}