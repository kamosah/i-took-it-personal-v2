import { Box, SimpleGrid } from "@chakra-ui/react";
import { getAllPosts } from "../../lib/mdx/utils";
import BlogPost from "../../components/ui/blog-post";
import FeaturedBlogPost from "../../components/ui/featured-blog-post";

export const metadata = {
  title: "Blog | Personal Blog",
  description: "Read my latest blog posts",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      {/* if the posts are filtered by tags, updated the heading */}
      {/* <Heading as="h1" mb={8} fontSize="3xl">
        {tag ? `${tag.charAt(0).toUpperCase() + tag.slice(1)} Posts` : 'Blog'}
      </Heading> */}
      <Box mb={8}>
        <FeaturedBlogPost {...posts[0]} />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} rowGap={8} columnGap={8}>
        {posts.slice(1).map((post) => (
          <BlogPost key={post.slug} post={post} />
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
