import { Box, Flex, Heading, Hide, Image, Text } from "@chakra-ui/react";


const Leftside = () => {
  return (
    <Hide below="md">
      <Box
        bg={
          "linear-gradient(90deg, rgba(31,64,176,1) 0%, rgba(111,56,216,1) 75%, rgba(145,52,233,1) 100%);"
        }
        width={"20%"}
        height={"100vh"}
        pt={"20px"}
      >
      <Flex padding={"15px"} gap={"20px"}>
      <Image
        borderRadius="full"
        boxSize="50px"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      />
      <Flex direction={"column"}>
        <Heading as="h4" size="md" color={"white"}>
          Yellow Owl
        </Heading>
        <Text fontSize={"md"} color={"lightblue"}>
          Admin
        </Text>
      </Flex>
    </Flex>
      </Box>
    </Hide>
  );
};

export default Leftside;