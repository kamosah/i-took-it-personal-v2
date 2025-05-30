import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Container, Flex, Tag } from "@chakra-ui/react";
import { getPostBySlug, serializeMdx } from "../../../lib/mdx/utils";
import MDXContent from "../../../components/mdx-content";
import { formatDate } from "../../../lib/utils/date";

// Generate metadata for the post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Personal Blog`,
    description: `${post.title} - Published on ${formatDate(post.date)}`,
    openGraph: {
      title: post.title,
      description: `Published on ${formatDate(post.date)}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Handle case when post is not found
  if (!post) {
    notFound();
  }

  // Serialize MDX content for rendering
  const mdxSource = await serializeMdx(post);

  return (
    <Container maxW="container.md" py={8} px={0}>
      <article>
        <header>
          <Box divideX="2px" mb={8} />
        </header>

        <Box className="mdx-content" mt={6}>
          {/* Client component to render MDX */}
          <MDXContent source={mdxSource} />
        </Box>

        {post.tags && post.tags.length > 0 && (
          <Flex flexWrap="wrap" gap={2} mb={6}>
            {post.tags.map((tag) => (
              <Tag.Root key={tag} size="md" variant="subtle" colorScheme="blue">
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            ))}
          </Flex>
        )}
      </article>
    </Container>
  );
}
