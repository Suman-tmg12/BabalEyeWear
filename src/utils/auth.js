// src/utils/auth.js
// Reads and clears the login that Login.jsx saves in localStorage ("token" and "user").

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// If the token is a JWT, read its expiry. Returns null when it is not a JWT or has no exp.
const getTokenExpiry = (token) => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const { exp } = JSON.parse(json);
    return typeof exp === 'number' ? exp : null;
  } catch {
    return null;
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;
  const exp = getTokenExpiry(token);
  if (exp && exp * 1000 < Date.now()) return false; // expired
  return true;
};

// Works with different backend shapes: { name }, { firstName, lastName }, { first_name, last_name }, { username }...
export const getDisplayName = (user) => {
  if (!user) return '';
  const first = user.firstName || user.first_name || user.firstname;
  const last = user.lastName || user.last_name || user.lastname;
  return (
    user.name ||
    user.fullName ||
    user.full_name ||
    [first, last].filter(Boolean).join(' ') ||
    user.username ||
    (user.email ? user.email.split('@')[0] : '')
  );
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  // Same events Login.jsx fires, so the Navbar can refresh
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new CustomEvent('authChange'));
};