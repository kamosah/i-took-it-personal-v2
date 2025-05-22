import { Box } from "@chakra-ui/react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box>{children}</Box>;
}
