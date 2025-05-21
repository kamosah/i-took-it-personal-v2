"use client";

import { Box, ClientOnly, Skeleton } from "@chakra-ui/react";
import NextImage from "next/image";
import { useColorModeValue } from "./color-mode";

interface ThemeStyles {
  boxShadow?: string;
  borderColor?: string;
  [key: string]: string | undefined;
}

interface FeaturedImageProps {
  src: string;
  alt: string;
  lightStyles?: ThemeStyles;
  darkStyles?: ThemeStyles;
  height?: { base: string; md: string; lg: string };
  defaultMode?: "light" | "dark";
}

export function FeaturedImage({
  src,
  alt,
  lightStyles = {},
  darkStyles = {},
  height = { base: "200px", md: "300px", lg: "400px" },
  defaultMode = "light",
}: FeaturedImageProps) {
  const styles = useColorModeValue(
    { boxShadow: "md", borderColor: "gray.200", ...lightStyles },
    { boxShadow: "dark-lg", borderColor: "gray.600", ...darkStyles }
  );

  // Use default mode for SSR if no client-side context is available
  const ssrStyles =
    defaultMode === "light"
      ? { boxShadow: "md", borderColor: "gray.200", ...lightStyles }
      : { boxShadow: "dark-lg", borderColor: "gray.600", ...darkStyles };

  return (
    <ClientOnly fallback={<Skeleton />}>
      <Box
        borderColor={styles.borderColor || ssrStyles.borderColor}
        borderRadius="md"
        borderWidth="1px"
        boxShadow={styles.boxShadow || ssrStyles.boxShadow}
        height={height}
        mb={6}
        overflow="hidden"
        position="relative"
      >
        <NextImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 500px, (max-width: 1200px) 700px, 900px"
          priority
          quality={80}
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </Box>
    </ClientOnly>
  );
}
