import NextLink from "next/link";
import { Box, Heading, Text, Flex, SimpleGrid, Tag } from "@chakra-ui/react";
import { getAllPosts } from "../../lib/mdx/utils";
import Image from "next/image";
import { formatDate } from "../../lib/utils/date";

export const metadata = {
  title: "Blog | Personal Blog",
  description: "Read my latest blog posts",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  console.log("posts", posts);

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      {/* if the posts are filtered by tags, updated the heading */}
      {/* <Heading as="h1" mb={8} fontSize="3xl">
        {tag ? `${tag.charAt(0).toUpperCase() + tag.slice(1)} Posts` : 'Blog'}
      </Heading> */}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} rowGap={8} columnGap={8}>
        {posts.map((post) => (
          <NextLink href={`/blog/${post.slug}`} key={post.slug} passHref>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              transition="transform 0.2s"
              _hover={{ transform: "translateY(-4px)" }}
            >
              <Box position="relative" height="200px">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  fill
                  sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
                  priority
                  quality={90}
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box p={5}>
                <Heading
                  size="md"
                  mb={2}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.title}
                </Heading>
                <Text color="gray.600" fontSize="sm" mb={3}>
                  {formatDate(post.date)} • {post.author.name}
                </Text>
                <Text
                  mt={2}
                  mb={4}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.excerpt}
                </Text>
                <Flex gap={2}>
                  {post.tags.map((tag) => (
                    <Tag.Root key={tag} size="sm" colorScheme="purple">
                      <Tag.Label>{tag}</Tag.Label>
                    </Tag.Root>
                  ))}
                </Flex>
              </Box>
            </Box>
          </NextLink>
        ))}
      </SimpleGrid>

      {/* Pagination */}
      {/* <Flex justify="center" mt={8} gap={4}>
        {page > 1 && (
          <Link
            href={`/blog?page=${page - 1}${tag ? `&tag=${tag}` : ''}`}
            rel="prev"
          >
            Previous
          </Link>
        )}

        {page < totalPages && (
          <Link
            href={`/blog?page=${page + 1}${tag ? `&tag=${tag}` : ''}`}
            rel="next"
          >
            Next
          </Link>
        )}
      </Flex> */}
    </Box>
  );
}
