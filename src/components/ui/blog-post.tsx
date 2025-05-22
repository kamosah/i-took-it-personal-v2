import { Box, Heading, Tag, Text, Card } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { Post } from "../../lib/mdx/types";
import { formatDate } from "../../lib/utils/date";

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <NextLink href={`/blog/${post.slug}`} key={post.slug} passHref prefetch>
      <Card.Root
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        transition="transform 0.2s"
        _hover={{ transform: "translateY(-4px)" }}
        height="500px"
        p={4}
      >
        <Box position="relative" height="200px" borderRadius="2xl">
          <NextImage
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
            priority
            quality={90}
            style={{ objectFit: "cover", borderRadius: "1.5rem" }}
          />
        </Box>
        <Card.Body p={5}>
          <Card.Title fontSize="lg" mb={2} lineClamp={2} as={Heading}>
            {post.title}
          </Card.Title>
          <Text color="gray.600" fontSize="sm" mb={3}>
            {formatDate(post.date)} • {post.author.name}
          </Text>

          <Card.Description
            as={Text}
            mt={2}
            mb={4}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            lineHeight="tall"
            fontSize="md"
          >
            {post.excerpt}
          </Card.Description>
        </Card.Body>

        <Card.Footer display="flex" gap={2} flexWrap="wrap" width="100%">
          {post.tags.map((tag) => (
            <Tag.Root key={tag} size="sm" flexShrink={0}>
              <Tag.Label>{tag}</Tag.Label>
            </Tag.Root>
          ))}
        </Card.Footer>
      </Card.Root>
    </NextLink>
  );
};

export default BlogPost;
