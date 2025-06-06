import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Post } from "../../lib/mdx/types";

export const TableOfContents = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Heading as="h2" size="2xl" mb={4}>
        Related Blog Posts
      </Heading>
      <Flex direction="column" mb={4}>
        {posts.map((post) => (
          <Box key={post.slug} py={2}>
            <NextLink href={`/blog/${post.slug}`} passHref>
              <Text fontSize="lg" textWrap="wrap">
                {post.title}
              </Text>
            </NextLink>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default TableOfContents;
