import { jwtDecode } from "jwt-decode";
import { User } from "../types";

export const isLoggedIn = (): boolean => {
  return localStorage.getItem("token") !== null;
};

export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("token");
  if (token) {
    const user: User = jwtDecode(token);
    return user.id;
  }
  return null;
};

export const isAdmin = (): boolean => {
  return localStorage.getItem("isAdmin") === "true";
};
