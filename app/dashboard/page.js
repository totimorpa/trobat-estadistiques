"use client";
import { Box, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const data = [
  { month: "January", toiletsUsed: 400 },
  { month: "February", toiletsUsed: 300 },
  { month: "March", toiletsUsed: 200 },
  { month: "April", toiletsUsed: 278 },
  { month: "May", toiletsUsed: 189 },
  { month: "June", toiletsUsed: 239 },
  { month: "July", toiletsUsed: 349 },
  { month: "August", toiletsUsed: 400 },
  { month: "September", toiletsUsed: 300 },
  { month: "October", toiletsUsed: 200 },
  { month: "November", toiletsUsed: 278 },
  { month: "December", toiletsUsed: 189 },
];

function Dashboard() {
  const router = useRouter();
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
        onClick={() => router.back()}
        bg="transparent"
        aria-label="Go back"
      />
      <Heading mb={5}>Dashboard</Heading>
      <Flex direction="row" wrap="wrap">
        <Box p={3} sx={{ bg: "gray.100", borderRadius: 10 }}>
          <LineChart width={300} height={300} data={data}>
            <Line type="monotone" dataKey="toiletsUsed" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Box>
        {/* Add more charts here */}
      </Flex>
    </Flex>
  );
}

export default Dashboard;
