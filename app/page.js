import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Link,
  Heading,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";

function App() {
  return (
    <Flex
      direction="column"
      bg="blue.500"
      minH="100vh"
      p={3}
      alignItems="center"
      justifyContent="center"
    >
      <Heading textAlign="center" color="white" m={5}>
        Quin personatge ets?
      </Heading>

      <Box>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          justifyContent="center"
          alignItems="center"
          h="100%"
        >
          <GridItem>
            <Link href="/diaz">
              <Image
                src="diaz.png"
                alt="Image 1"
                sx={{ borderRadius: 30 }}
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
          </GridItem>
          <GridItem>
            <Link href="/enric">
              <Image
                src="enric.png"
                alt="Image 2"
                sx={{ borderRadius: 30 }}
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
          </GridItem>
          <GridItem>
            <Link href="/toti">
              <Image
                src="toti.png"
                alt="Image 3"
                sx={{ borderRadius: 30 }}
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
          </GridItem>
          <GridItem>
            <Link href="/sales">
              <Image
                src="sales.png"
                alt="Image 4"
                sx={{ borderRadius: 30 }}
                _hover={{ transform: "scale(1.1)" }}
              />
            </Link>
          </GridItem>
        </Grid>
      </Box>
      <Box textAlign={"center"}>
        <Link href="/dashboard">
          <Button
            sx={{ w: "200px", h: "200px" }}
            bg="transparent"
            _hover={{ bg: "transparent" }}
          >
            <Text fontSize={"100"} _hover={{ fontSize: "110" }}>
              📊
            </Text>
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default App;
