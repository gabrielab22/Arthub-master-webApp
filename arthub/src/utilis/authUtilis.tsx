import { jwtDecode } from "jwt-decode";
import { CartItem, User } from "../types";

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

export const calculateTotalPrice = (cartItems: any) => {
  let totalPrice = 0;
  cartItems.forEach(
    (cartItem: { quantity: number; product: { price: number } }) => {
      totalPrice += cartItem.quantity * cartItem.product.price;
    }
  );
  console.log(totalPrice, "totalPrice");
  return totalPrice;
};
