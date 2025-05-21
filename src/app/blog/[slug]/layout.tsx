import { notFound } from "next/navigation";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { getPostBySlug } from "../../../lib/mdx/utils";
import { calculateReadingTime } from "../../../lib/utils/readingTime";
import { formatDate } from "../../../lib/utils/date";
import { Author } from "../../../components/ui/author";
import { FeaturedImage } from "../../../components/ui/featured-image";

const BlogPostLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const routeParams = await params;
  const post = getPostBySlug(routeParams.slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  return (
    <Container maxW="container.md" py={8}>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {formatDate(post.date)} • {readingTime} min read
      </Text>
      <Heading as="h1" mb={8} fontSize="3xl">
        {post.title}
      </Heading>
      <Text fontSize="lg" mb={4} color="gray.600">
        {post.excerpt}
      </Text>
      <Author {...post.author} />
      <Box mt={8}>
        <FeaturedImage
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          height={{ base: "200px", md: "300px", lg: "400px" }}
        />
      </Box>
      <article>{children}</article>
      {/* TODO: Add sidebar table of contents and related articles */}
    </Container>
  );
};

export default BlogPostLayout;
