import { Box, Heading, Text } from "@chakra-ui/react";
import { RevealFx } from "../once-ui/components";

export default function Index() {
  return (
    <Box as="main" maxW="1200px" mx="auto" px={4} py={8}>
      <Box textAlign="center" py={10}>
        <RevealFx
          fillWidth
          horizontal="start"
          paddingTop="16"
          paddingBottom="32"
          paddingLeft="12"
        >
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to My Blog
          </Heading>
        </RevealFx>
        <RevealFx
          translateY="4"
          fillWidth
          horizontal="start"
          paddingBottom="16"
        >
          <Text fontSize="xl" color="gray.600">
            Exploring technology, development, and personal growth
          </Text>
        </RevealFx>
      </Box>
    </Box>
  );
}
