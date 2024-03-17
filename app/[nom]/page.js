"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Link,
  Heading,
  Stack,
  Button,
  Text,
  IconButton,
  Flex,
  ScaleFade,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

function Page({ params }) {
  const nom = params.nom;
  const Router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleButtonClick = async (type) => {
    try {
      const response = await fetch("/api/addEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, nom }),
      });

      if (!response.ok) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          Router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <Flex
      direction="column"
      bg="blue.500"
      minH="100vh"
      p={3}
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        icon={<ArrowBackIcon />}
        position="absolute"
        top={3}
        left={3}
        borderRadius={50}
        onClick={() => Router.back()}
        bg="transparent"
        aria-label="Go back"
      />
      <Flex direction="row" alignItems="center">
        <Image
          src={`${nom}.png`}
          alt="Image 1"
          sx={{ borderRadius: 10, w: "40px" }}
        />
        <Heading textAlign="center" color="white" fontSize={40}>
          {nom.charAt(0).toUpperCase() + nom.slice(1)}
        </Heading>
      </Flex>

      <Stack
        direction="row"
        spacing={5}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          sx={{ w: "200px", h: "200px" }}
          bg="transparent"
          _hover={{ bg: "transparent" }}
          onClick={() => handleButtonClick("toilet")} // Handle toilet button click
        >
          <Text fontSize={"130"} _hover={{ fontSize: "140" }}>
            🚽
          </Text>
        </Button>
        <Button
          sx={{ w: "200px", h: "200px" }}
          bg="transparent"
          _hover={{ bg: "transparent" }}
          onClick={() => handleButtonClick("bed")} // Handle bed button click
        >
          <Text fontSize={"150"} _hover={{ fontSize: "160" }}>
            🛏️
          </Text>
        </Button>
      </Stack>

      {/* Success animation */}
      <ScaleFade initialScale={0.9} in={showSuccess}>
        <Box
          bg="green.400"
          color="white"
          p={3}
          mt={4}
          borderRadius="md"
          textAlign="center"
        >
          Gracies per contribuir a fer un mon millor!
        </Box>
      </ScaleFade>

      {/* Error warning */}
      <ScaleFade initialScale={0.9} in={showError}>
        <Box
          bg="red.400"
          color="white"
          p={3}
          mt={4}
          borderRadius="md"
          textAlign="center"
        >
          Hi ha hagut un error. Si us plau, torna-ho a provar més tard.
        </Box>
      </ScaleFade>
    </Flex>
  );
}

export default Page;
