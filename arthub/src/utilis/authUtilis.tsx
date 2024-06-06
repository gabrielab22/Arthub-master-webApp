import { jwtDecode } from "jwt-decode";
import { User } from "../types";
import axios from "axios";

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

  return totalPrice;
};

export const updatePaymentStatus = async (paymentId: number) => {
  try {
    const response = await axios.put(`payment/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

export const deleteCartItemsByUserId = async (userId: number) => {
  try {
    await axios.delete(`/cart-item/delete-by-user/${userId}`);
    console.log("All cart items for user", userId, "deleted successfully");
  } catch (error) {
    console.error("Error deleting cart items:", error);
    throw error;
  }
};
