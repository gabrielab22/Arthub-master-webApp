import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { isAdmin, isLoggedIn } from "../../utilis/authUtilis";

const NavBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, title: "-Home-", link: "/" },
    { id: 2, title: "-Shop-", link: "/shop" },
    { id: 3, title: "-Art-", link: "/art" },
    { id: 4, title: "-Contact-", link: "/contact" },
  ];

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
      {isLoggedIn() && !isAdmin() && (
        <Button
          rightIcon={<MdHistory />}
          colorScheme="green"
          variant="outline"
          onClick={() => navigate("/history")}
          style={{ marginRight: "10px" }}
        >
          History of order
        </Button>
      )}

      {isLoggedIn() && !isAdmin() && (
        <Button
          rightIcon={<BsCart4 />}
          colorScheme="blue"
          variant="outline"
          onClick={() => navigate("/cart-item")}
          style={{ marginRight: "10px" }}
        >
          Cart
        </Button>
      )}
      <div>
        {isLoggedIn() ? (
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
