import NextLink from "next/link";
import NextImage from "next/image";
import { Box, Text, Card, Tag, Heading } from "@chakra-ui/react";
import { Post } from "../../lib/mdx/types";
import { formatDate } from "../../lib/utils/date";

const FeaturedBlogPost = (post: Post) => {
  return (
    <NextLink href={`/blog/${post.slug}`} key={post.slug} passHref prefetch>
      <Card.Root
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        transition="transform 0.2s"
        _hover={{ transform: "translateY(-4px)" }}
        height="350px"
        p={4}
        flexDirection="row"
      >
        <Box position="relative" width="50%" borderRadius="2xl">
          <NextImage
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            sizes="(max-height: 768px) 100%, (max-height: 1200px) 100%, 100%"
            priority
            quality={90}
            style={{ objectFit: "cover", borderRadius: "1.5rem" }}
          />
        </Box>
        <Box display="flex" flexDirection="column" width="50%" height="100%">
          <Card.Body p={5} flex="1">
            <Card.Title
              mb={2}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              as={Heading}
              fontSize="2xl"
            >
              {post.title}
            </Card.Title>
            <Text color="gray.600" fontSize="sm" mb={3}>
              {formatDate(post.date)} • {post.author.name}
            </Text>

            <Card.Description
              mt={2}
              mb={4}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              as={Text}
              fontSize="md"
              color="gray.700"
              lineHeight="tall"
            >
              {post.excerpt}
            </Card.Description>
          </Card.Body>

          <Card.Footer
            display="flex"
            gap={2}
            flexWrap="wrap"
            width="100%"
            marginTop="auto"
            p={5}
            pt={0}
          >
            {post.tags.map((tag) => (
              <Tag.Root key={tag} size="sm" flexShrink={0}>
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            ))}
          </Card.Footer>
        </Box>
      </Card.Root>
    </NextLink>
  );
};

export default FeaturedBlogPost;
