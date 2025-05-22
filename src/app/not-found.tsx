import { Box, Heading, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";

export default function GlobalNotFound() {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="2xl" mb={4} color="red.500">
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" mb={6}>
        Sorry, we couldn&apos;t find that page.
      </Text>
      <NextLink href="/" passHref prefetch>
        <Button as="a" colorScheme="teal" size="lg">
          Back to Home
        </Button>
      </NextLink>
    </Box>
  );
}
