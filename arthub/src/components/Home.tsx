import React from "react";
import { Text, Box } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box>
      <main>
        <Text fontFamily="Cinzel" fontSize="40px" textAlign="center" mt="4">
          Welcome to arthub!
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          backgroundColor="rgba(128, 128, 128, 0.5)"
        >
          <Box mb="10px" width="100%">
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
            <Text as="samp" flex="1">
              Welcome to my updated website! Here, you'll find a rich gallery
              section that I'll keep fresh with regular updates. Browse through
              our shop for limited edition prints, artist proofs, and original
              artwork. Enjoy exploring!
            </Text>
            <Box flex="1" textAlign="center">
              <img
                src="/assets/img/gitar-man.jpg"
                alt="Gitar man"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Box>
          <Box mb="10px" width="100%">
            <img
              src="/assets/img/chill-man.jpg"
              alt="Chill Man"
              style={{ width: "100%" }}
            />
          </Box>
          <Box mb="10px" width="100%">
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
