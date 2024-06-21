import React from "react";
import { Button, ButtonGroup, Box, Flex, Stack } from "@chakra-ui/react";
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
    <Flex
      as="header"
      className="navbar"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="black"
      color="white"
    >
      <Box>
        <ButtonGroup variant="outline" spacing="3">
          {isLoggedIn() ? (
            <>
              <Button
                rightIcon={<MdHistory />}
                colorScheme="green"
                onClick={() => navigate("/history")}
              >
                History of order
              </Button>
              <Button
                rightIcon={<BsCart4 />}
                colorScheme="blue"
                onClick={() => navigate("/cart-item")}
              >
                Cart
              </Button>
              {isAdmin() && (
                <Button
                  colorScheme="purple"
                  onClick={() => navigate("/statistic")}
                >
                  Statistics
                </Button>
              )}
            </>
          ) : (
            <>
              <Button colorScheme="green" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button colorScheme="blue" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </ButtonGroup>
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 8 }}
        alignItems="center"
      >
        {menuItems.map((item) => (
          <Box key={item.id}>
            <Button
              as="a"
              href={item.link}
              variant="ghost"
              color="white"
              _hover={{ bg: "teal.700" }}
            >
              {item.title}
            </Button>
          </Box>
        ))}
      </Stack>

      {isLoggedIn() && (
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Flex>
  );
};

export default NavBar;
