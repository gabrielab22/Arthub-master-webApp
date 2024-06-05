export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
export interface CartItemResponse {
  id: number;
  quantity: number;
  productId: number;
  product: Product;
}

export interface User {
  id: number;
  email: string;
  fullname: string;
  password: string;
  address: string;
  role: Role;
  createdAt: string;
}

export interface RegistrationResponse {
  user: User;
  token: string;
}

export interface CreateUser {
  email: string;
  fullname?: string | null;
  password: string;
  address?: string | null;
  role: Role;
}

export interface PaymentDetail {
  id: number;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  orderDetail?: OrderDetail | null;
  createdAt: Date;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Product {
  id: number;
  name?: string | null;
  variant: Variant;
  description: string;
  price: number;
  quantity: number;
  pictureUrl?: string | null;
  cartItems: CartItem[];
  orderItems: OrderItem[];
  createdAt: Date;
}

export interface OrderDetail {
  id: number;
  total: number;
  status: OrderStatus;
  user: User;
  paymentDetail: PaymentDetail;
  orderItems: OrderItem[];
  createdAt: Date;
}

export interface OrderItem {
  id: number;
  quantity: number;
  orderDetail: OrderDetail;
  product: Product;
  createdAt: Date;
}

// Enums

export enum Variant {
  TSHIRT = "TSHIRT",
  SKETCHBOOOK = "SKETCHBOOOK",
  ARTWORK = "ARTWORK",
  ILLUSTRATION = "ILLUSTRATION",
  ANIMATION = "ANIMATION",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
}

export enum PaymentStatus {
  INPROGRESS = "INPROGRESS",
  PAID = "PAID",
}

export enum PaymentMethod {
  CARD = "CARD",
  CASH = "CASH",
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
