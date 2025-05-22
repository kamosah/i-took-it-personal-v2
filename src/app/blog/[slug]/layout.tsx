import { notFound } from "next/navigation";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { getAllPosts, getPostBySlug } from "../../../lib/mdx/utils";
import { calculateReadingTime } from "../../../lib/utils/readingTime";
import { formatDate } from "../../../lib/utils/date";
import { Author } from "../../../components/ui/author";
import { FeaturedImage } from "../../../components/ui/featured-image";
import RelatedBlogPosts from "../../../components/ui/related-blog-posts";
import { Post } from "../../../lib/mdx/types";
import PostTableOfContents from "../../../components/ui/post-table-of-contents";

const BlogPostLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const routeParams = await params;
  const post = getPostBySlug(routeParams.slug);
  const tags = post?.tags || [];
  const posts = await getAllPosts();
  const relatedPosts = posts.filter((p) => {
    return (
      p.slug !== post?.slug &&
      p.tags.some((tag) => tags.includes(tag)) &&
      p.title !== post?.title
    );
  });
  const relatedPostsToShow = relatedPosts.slice(0, 3);
  const relatedPostsList = relatedPostsToShow.map((post) => {
    return {
      date: post.date,
      excerpt: post.excerpt,
      slug: post.slug,
      title: post.title,
    } as Post;
  });

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  return (
    <Container
      maxW={{ sm: "100%", base: "100%", md: "container.md" }}
      py={{ base: 4, md: 8 }}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
    >
      <Container maxW={{ sm: "100%", base: "100%", md: "container.md" }} mb="8">
        <Text fontSize="sm" color="gray.500" mb={2}>
          {formatDate(post.date)} • {readingTime} min read
        </Text>
      </Container>
      <Flex position="relative" gap={6} align="flex-start">
        <Container maxW={{ base: "100%", md: "67%" }} pr={{ md: 4, lg: 8 }}>
          <Heading as="h1" mb={8} fontSize="3xl">
            {post.title}
          </Heading>
          <Text fontSize="lg" mb={4} color="gray.600">
            {post.excerpt}
          </Text>
          <Box pt={4}>
            <Author {...post.author} />
          </Box>
          <Box mt={8}>
            <FeaturedImage
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              height={{ base: "200px", md: "300px", lg: "400px" }}
            />
          </Box>
          <article>{children}</article>
        </Container>

        <Container
          alignSelf="flex-start"
          display={{ base: "none", md: "block" }}
          flexDirection="column"
          height="fit-content"
          position="sticky"
          top="100px"
          w={{ md: "33%", lg: "33%" }}
        >
          {post.headings && post.headings.length > 0 && (
            <PostTableOfContents headings={post.headings} />
          )}
          {relatedPostsList.length > 0 && (
            <RelatedBlogPosts posts={relatedPostsList} />
          )}
        </Container>
      </Flex>
    </Container>
  );
};

export default BlogPostLayout;
