import React from "react";
import { Text, Box } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box>
      <main>
        <Text
          fontFamily="Cinzel"
          fontSize={{ base: "24px", md: "40px" }}
          textAlign="center"
        >
          Welcome to arthub!
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          backgroundColor="rgba(128, 128, 128, 0.5)"
        >
          <Box
            mb={{ base: "20px", md: "10px" }}
            width={{ base: "100%", md: "80%" }}
          >
            <img
              src="/assets/img/sunset.jpg"
              alt="sunset"
              style={{ width: "100%" }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
            mb="10px"
            p="4"
            width="100%"
          >
            <Text
              as="samp"
              flex={{ base: "1", md: "2" }}
              textAlign={{ base: "center", md: "left" }}
            >
              Welcome to my updated website! Here, you'll find a rich gallery
              section that I'll keep fresh with regular updates. Browse through
              our shop for limited edition prints, artist proofs, and original
              artwork. Enjoy exploring!
            </Text>
            <Box flex={{ base: "1", md: "1" }} textAlign="center">
              <img
                src="/assets/img/gitar-man.jpg"
                alt="Gitar man"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Box>
          <Box
            mb={{ base: "20px", md: "10px" }}
            width={{ base: "100%", md: "80%" }}
          >
            <img
              src="/assets/img/chill-man.jpg"
              alt="Chill Man"
              style={{ width: "100%" }}
            />
          </Box>
          <Box
            mb={{ base: "20px", md: "10px" }}
            width={{ base: "100%", md: "80%" }}
          >
            <img
              src="/assets/img/locals.jpg"
              alt="locals"
              style={{ width: "100%" }}
            />
          </Box>
        </Box>
      </main>
      <footer
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.5)",
          color: "black",
          padding: "20px",
        }}
      >
        <p>© 2024 Gabriela Bilanzic</p>
      </footer>
    </Box>
  );
};

export default HomePage;
