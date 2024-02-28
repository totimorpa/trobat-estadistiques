"use client";
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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const nom = params.nom;
  console.log(nom);
  const Router = useRouter();
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
        >
          <Text fontSize={"130"} _hover={{ fontSize: "140" }}>
            🚽
          </Text>
        </Button>
        <Button
          sx={{ w: "200px", h: "200px" }}
          bg="transparent"
          _hover={{ bg: "transparent" }}
        >
          <Text fontSize={"150"} _hover={{ fontSize: "160" }}>
            🛏️
          </Text>
        </Button>
      </Stack>
    </Flex>
  );
}

export default Page;
