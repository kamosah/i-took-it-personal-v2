"use client";

import { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Link,
  ListItem,
  List,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { type TableOfContentsItem } from "../../lib/mdx/extract-headings";
import { useColorModeValue } from "./color-mode";

interface PostTableOfContentsProps {
  headings: TableOfContentsItem[];
  title?: string;
  className?: string;
  contentId?: string;
}

// TODO: Make TOC Collapsible
export default function PostTableOfContents({
  headings,
  title = "Table of Contents",
  className = "toc",
  contentId = "main-content",
}: PostTableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeId, setActiveId] = useState<string>("");
  const tocRef = useRef<HTMLDivElement>(null);
  const bgColor = useColorModeValue("f8f9fa", "#2d3748");
  const borderColor = useColorModeValue("#2b6cb0", "#63b3ed");

  // Toggle the expanded/collapsed state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Set up intersection observer to detect which section is currently in view
  useEffect(() => {
    const observerOptions = {
      rootMargin: "-100px 0px -66%",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);

      // Also observe nested headings if any
      if (heading.items) {
        heading.items.forEach((subHeading) => {
          const subElement = document.getElementById(subHeading.id);
          if (subElement) observer.observe(subElement);
        });
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (!headings.length) return null;

  return (
    <Box
      className={className}
      ref={tocRef}
      position={{ base: "relative", md: "sticky" }}
      top="80px"
      maxHeight={{ base: "auto", md: "calc(100vh - 40px)" }}
      overflowY="auto"
      backgroundColor={bgColor}
      borderLeftColor={borderColor}
      mb={{ base: 6, md: 8 }}
      zIndex={1}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" className="toc-heading" size="md">
          {title}
        </Heading>
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleExpanded}
          aria-label={
            isExpanded
              ? "Collapse table of contents"
              : "Expand table of contents"
          }
        >
          {isExpanded ? "−" : "+"}
        </Button>
      </Flex>

      {/* Skip to content link */}
      <Link
        href={`#${contentId}`}
        display="block"
        mb={4}
        fontWeight="medium"
        fontSize="sm"
        color="blue.500"
      >
        Skip to content ↓
      </Link>

      {isExpanded && (
        <Box as="nav" role="navigation">
          <RenderHeadings headings={headings} activeId={activeId} />
        </Box>
      )}
    </Box>
  );
}

function RenderHeadings({
  headings,
  activeId,
}: {
  headings: TableOfContentsItem[];
  activeId: string;
}) {
  return (
    <List.Root as="ol" listStyleType="none" gap={1} ml={0}>
      {headings.map((heading) => {
        const isActive = activeId === heading.id;
        const hasActiveChild = heading.items?.some(
          (item) => item.id === activeId
        );

        return (
          <ListItem
            key={heading.id}
            ml={heading.level === 2 ? 0 : (heading.level - 2) * 4}
            className={isActive ? "active" : ""}
          >
            <Link
              href={`#${heading.id}`}
              color={isActive ? "blue.600" : "blue.500"}
              fontWeight={isActive || hasActiveChild ? "bold" : "normal"}
              bg={isActive ? "blue.50" : "transparent"}
              borderRadius="md"
              px={2}
              py={1}
              display="block"
              _hover={{ textDecoration: "underline", bg: "blue.50" }}
            >
              <Text fontSize={heading.level === 2 ? "md" : "sm"}>
                {heading.title}
              </Text>
            </Link>
            {heading.items && heading.items.length > 0 && (
              <RenderHeadings headings={heading.items} activeId={activeId} />
            )}
          </ListItem>
        );
      })}
    </List.Root>
  );
}
