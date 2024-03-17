"use client";
import { useState, useEffect } from "react";

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Button,
  Text,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();
  const [toiletData, setToiletData] = useState([]);
  const [bedData, setBedData] = useState([]);
  const [selectedData, setSelectedData] = useState(toiletData);
  const [selectedFilters, setSelectedFilters] = useState([
    "enric",
    "sales",
    "diaz",
    "toti",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const toiletResponse = await fetch("/api/getToiletData", {
          cache: "no-store",
        });
        const bedResponse = await fetch("/api/getBedData", {
          cache: "no-store",
        });

        if (toiletResponse.ok && bedResponse.ok) {
          const toiletData = await toiletResponse.json();
          const bedData = await bedResponse.json();
          setToiletData(toiletData.result);
          setBedData(bedData.result);
          setSelectedData(toiletData.result);
        } else {
          console.error("Failed to fetch toilet or bed data");
        }
      } catch (error) {
        console.error("Error fetching toilet or bed data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleTogglePlot = (type) => {
    if (type === "toilet") {
      setSelectedData(toiletData);
    } else if (type === "bed") {
      setSelectedData(bedData);
    }
  };
  const generateColor = (personName) => {
    const colorMap = {
      enric: "#FFC300",
      sales: "#7FFF00",
      diaz: "#FF5733",
      toti: "#00BFFF",
    };

    return colorMap[personName.toLowerCase()];
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
        onClick={() => router.back()}
        bg="transparent"
        aria-label="Go back"
      />
      <Flex mb={5} justifyContent="center" width="100%">
        <Button
          colorScheme="teal"
          onClick={() => handleTogglePlot("toilet")}
          mr={2}
          isActive={selectedData === toiletData}
        >
          🚽
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => handleTogglePlot("bed")}
          isActive={selectedData === bedData}
        >
          🛏️
        </Button>
      </Flex>
      <Flex direction="row" wrap="wrap">
        <Flex mb={5} justifyContent="center" width="100%">
          <Button
            colorScheme={selectedFilters.includes("enric") ? "green" : "gray"}
            onClick={() => handleFilterClick("enric")}
            mr={2}
          >
            Enric
          </Button>
          <Button
            colorScheme={selectedFilters.includes("sales") ? "green" : "gray"}
            onClick={() => handleFilterClick("sales")}
            mr={2}
          >
            Sales
          </Button>
          <Button
            colorScheme={selectedFilters.includes("diaz") ? "green" : "gray"}
            onClick={() => handleFilterClick("diaz")}
            mr={2}
          >
            Diaz
          </Button>
          <Button
            colorScheme={selectedFilters.includes("toti") ? "green" : "gray"}
            onClick={() => handleFilterClick("toti")}
          >
            Toti
          </Button>
        </Flex>
        <Box
          p={3}
          sx={{
            bg: "gray.100",
            borderRadius: 10,
            margin: "auto",
            pr: 3,
          }}
        >
          <BarChart width={350} height={500} data={selectedData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis tick={{ fontSize: 15 }} />

            <Tooltip />
            <Legend />
            {selectedFilters.map((filter, index) => (
              <Bar
                key={index}
                dataKey={filter}
                name={filter}
                fill={generateColor(filter)}
              >
                <LabelList dataKey={filter} position="top" />
              </Bar>
            ))}
          </BarChart>
        </Box>
      </Flex>
      <Flex direction="column" alignItems="center" mt={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {selectedFilters.map((filter) => (
                <Th key={filter} color={generateColor(filter)}>
                  {filter}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {selectedFilters.map((filter) => (
                <Td key={filter}>
                  {selectedData.reduce(
                    (total, data) => total + data[filter],
                    0
                  )}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
