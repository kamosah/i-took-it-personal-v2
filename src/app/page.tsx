import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box as="main" maxW="1200px" mx="auto" px={4} py={8}>
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to My Blog
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Exploring technology, development, and personal growth
        </Text>
      </Box>
    </Box>
  );
}
