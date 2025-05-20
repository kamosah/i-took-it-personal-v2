"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider, ColorModeProviderProps } from "./ui/color-mode";

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

export const Providers = (props: ColorModeProviderProps) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
};
