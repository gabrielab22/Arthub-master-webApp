import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar/NavBar";
import ProductGrid from "./components/Products/ProductGrid";
import AddProduct from "./components/Products/AddProduct";
import ContactForm from "./components/Contact";
import EditProduct from "./components/Products/EditProduct";
import VideoGrid from "./components/Art/VideoGrid";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div
        style={{
          paddingTop: "5%",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="art" element={<VideoGrid />} />
          <Route path="shop" element={<ProductGrid />} />
          <Route path="contact" element={<ContactForm />} />
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
