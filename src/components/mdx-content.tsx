/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MDXRemote } from "next-mdx-remote";
import {
  Box,
  Heading,
  Text,
  Code,
  Link,
  Image,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

// TODO: Check custom components for MDX

// Define the props type for the component
interface MDXContentProps {
  source: any; // The serialized MDX source from next-mdx-remote/serialize
}

// Custom components to override default MDX elements
export const components = {
  // Headings
  h1: (props: any) => <Heading as="h1" size="2xl" mt={8} mb={4} {...props} />,
  h2: (props: any) => <Heading as="h2" size="xl" mt={6} mb={3} {...props} />,
  h3: (props: any) => <Heading as="h3" size="lg" mt={5} mb={2} {...props} />,
  h4: (props: any) => <Heading as="h4" size="md" mt={4} mb={2} {...props} />,
  h5: (props: any) => <Heading as="h5" size="sm" mt={3} mb={1} {...props} />,
  h6: (props: any) => (
    <Heading as="h6" size="xs" fontWeight="medium" mt={3} mb={1} {...props} />
  ),

  // Text and Emphasis
  p: (props: any) => <Text my={3} lineHeight="tall" {...props} />,
  strong: (props: any) => <Text as="strong" fontWeight="bold" {...props} />,
  em: (props: any) => <Text as="em" fontStyle="italic" {...props} />,
  // blockquote: (props: any) => (
  //   <Blockquote.Root my={4} borderRadius="md" bg="blue.50" {...props} />
  // ),
  code: (props: any) => <Code p={2} borderRadius="md" {...props} />,
  pre: (props: any) => (
    <Box
      as="pre"
      p={4}
      bg="gray.100"
      borderRadius="md"
      overflowX="auto"
      {...props}
    />
  ),
  kbd: (props: any) => (
    <Box
      as="kbd"
      fontSize="sm"
      bg="gray.100"
      p={1}
      borderRadius="md"
      {...props}
    />
  ),
  abbr: (props: any) => (
    <Box as="abbr" textDecoration="underline dotted" cursor="help" {...props} />
  ),
  mark: (props: any) => <Box as="mark" bg="yellow.200" {...props} />,

  // Lists
  // ul: (props: any) => <List.Root pl={5} my={3} spacing={2} {...props} />,
  // ol: (props: any) => (
  //   <List.Root as="ol" pl={5} my={3} spacing={2} {...props} />
  // ),
  // li: (props: any) => <ListItem {...props} />,

  // Links
  a: (props: any) => (
    <Link color="blue.500" textDecoration="underline" isExternal {...props} />
  ),

  // Media
  img: (props: any) => <Image my={4} borderRadius="md" {...props} />,

  // Horizontal Rule
  hr: () => <Box divideX="2px" my={4} />,

  // Tables
  // table: (props: any) => (
  //   <Box overflowX="auto" my={4}>
  //     <Table.Root variant="simple" size="sm" {...props} />
  //   </Box>
  // ),
  // thead: (props: any) => <Table.Header {...props} />,
  // tbody: (props: any) => <Table.Body {...props} />,
  // tfoot: (props: any) => <Table.Footer {...props} />,
  // tr: (props: any) => <Table.Row {...props} />,
  // th: (props: any) => <Table.ColumnHeader {...props} />,
  // td: (props: any) => <Table.Cell {...props} />,
  // col: (props: any) => <Table.Column {...props} />,
  // colgroup: (props: any) => <Table.ColumnGroup {...props} />,

  // Forms
  form: (props: any) => <Box as="form" {...props} />,
  input: (props: any) => <Input {...props} />,
  textarea: (props: any) => <Textarea {...props} />,
  // select: (props: any) => <NativeSelect.Root {...props} />,
  label: (props: any) => <Box as="label" fontWeight="bold" {...props} />,
  button: (props: any) => <Button {...props} />,
};

// The component itself
export default function MDXContent({ source }: MDXContentProps) {
  return (
    <Box className="prose-content">
      <MDXRemote {...source} components={components} />
    </Box>
  );
}
