import React, { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const menuItems = [
    { id: 1, title: "-Home-", link: "/" },
    { id: 2, title: "-Shop-", link: "/shop" },
    { id: 3, title: "-Art-", link: "/art" },
    { id: 4, title: "-Contact-", link: "/contact" },
  ];

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  window.addEventListener("storage", () => {
    setToken(localStorage.getItem("token"));
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <header className="navbar">
      <nav>
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id} style={{ margin: "0 10px" }}>
              <a href={item.link} className="menu-item">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {token ? (
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <ButtonGroup variant="outline" spacing="3">
            <Button colorScheme="blue" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button colorScheme="green" onClick={() => navigate("/register")}>
              Register
            </Button>
          </ButtonGroup>
        )}
      </div>
    </header>
  );
};

export default NavBar;
