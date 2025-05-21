"use client";

import { CacheProvider } from "@emotion/react";
import {
  ChakraProvider,
  ChakraProviderProps,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { createEmotionCache } from "../lib/styles/emotion-cache";
import { ColorModeProvider } from "./ui/color-mode";

const config = defineConfig({
  globalCss: {
    ".hljs": {
      background: "#282c34",
      color: "#abb2bf",
      padding: "1em",
      borderRadius: "md",
    },
    ".hljs-keyword, .hljs-selector-tag, .hljs-literal": {
      color: "#c678dd",
    },
    ".hljs-string, .hljs-title, .hljs-name, .hljs-type": {
      color: "#98c379",
    },
    ".hljs-comment": {
      color: "#5c6370",
      fontStyle: "italic",
    },
    ".hljs-built_in, .hljs-function": {
      color: "#61afef",
    },
  },
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, config);
const cache = createEmotionCache();

export const Providers: React.FC<Omit<ChakraProviderProps, "value">> = ({
  children,
  ...props
}) => {
  return (
    <CacheProvider value={cache}>
      <ChakraProvider {...props} value={system}>
        <ColorModeProvider defaultTheme="light">{children}</ColorModeProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};
