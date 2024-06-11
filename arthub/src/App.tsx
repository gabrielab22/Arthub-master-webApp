import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar/NavBar";
import ProductGrid from "./components/Products/ProductGrid";
import AddProduct from "./components/Products/AddProduct";
import ContactForm from "./components/Contact/Contact";
import EditProduct from "./components/Products/EditProduct";
import VideoGrid from "./components/Art/VideoGrid";
import CartItemComponent from "./components/CartItem/CarItem";
import CreateOrder from "./components/Order/CreateOrder";
import OrderList from "./components/Order/OrderList";
import Payment from "./components/Payment/StripePayment";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="art" element={<VideoGrid />} />
          <Route path="shop" element={<ProductGrid />} />
          <Route path="contact" element={<ContactForm />} />
          <Route path="cart-item" element={<CartItemComponent />} />
          <Route path="history" element={<OrderList />} />
          <Route path="order" element={<CreateOrder />} />
          <Route path="payment" element={<Payment />} />

          <Route path="product">
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:productId" element={<EditProduct />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
