"use client";

import {
  Card,
  Text,
  Tag,
  Box,
  Image,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Create motion components
const MotionCard = motion.create(Card.Root);
const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

// Typewriter hook
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    setDisplayText("");
    setIsComplete(false);
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

export const ExperienceCard = ({
  title,
  company,
  location,
  startDate,
  endDate,
  description,
  tags,
  logo,
}: {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  tags: string[];
  logo?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { displayText } = useTypewriter(isHovered ? description : "", 2);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <MotionCard
      ref={ref}
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      p={{ base: 6, md: 8 }}
      shadow="lg"
      w="full"
      bg="white"
      borderColor="gray.200"
      _dark={{
        bg: "gray.800",
        borderColor: "gray.600",
      }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      cursor="pointer"
      position="relative"
    >
      {/* Company Logo and Basic Info */}
      <motion.div variants={childVariants}>
        <Card.Header pb={{ base: 4, md: 6 }}>
          <HStack gap={{ base: 4, md: 6 }} align="start">
            {logo && (
              <MotionBox
                flexShrink={0}
                borderRadius="lg"
                overflow="hidden"
                shadow="md"
                border="2px solid"
                borderColor="gray.100"
                _dark={{ borderColor: "gray.600" }}
                w={{ base: "60px", md: "80px" }}
                h={{ base: "60px", md: "80px" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={logo}
                  alt={`${company} logo`}
                  w="full"
                  h="full"
                  objectFit="cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display =
                        "flex";
                    }
                  }}
                />
                <Box
                  w="full"
                  h="full"
                  bg="gradient-to-br from-blue.400 to-purple.500"
                  display="none"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontWeight="bold"
                  fontSize={{ base: "lg", md: "xl" }}
                >
                  {company.charAt(0)}
                </Box>
              </MotionBox>
            )}

            <VStack align="start" gap={{ base: 2, md: 3 }} flex={1}>
              <motion.div variants={childVariants}>
                <Card.Title
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  lineHeight="1.2"
                  color="gray.900"
                  _dark={{ color: "white" }}
                >
                  {title}
                </Card.Title>
              </motion.div>

              <motion.div variants={childVariants}>
                <VStack align="start" gap={1}>
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="semibold"
                    color="blue.600"
                    _dark={{ color: "blue.300" }}
                  >
                    {company}
                  </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                  >
                    📍 {location}
                  </Text>
                  <Badge
                    variant="subtle"
                    colorScheme="green"
                    fontSize={{ base: "xs", md: "sm" }}
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {startDate} - {endDate}
                  </Badge>
                </VStack>
              </motion.div>
            </VStack>
          </HStack>
        </Card.Header>
      </motion.div>

      {/* Typewriter Description on Hover */}
      <motion.div
        variants={{
          hidden: { opacity: 0, height: 0 },
          visible: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.4, ease: "easeInOut" },
          },
        }}
        initial="hidden"
        animate={isHovered ? "visible" : "hidden"}
      >
        <Card.Body pb={{ base: 4, md: 6 }}>
          <MotionText
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="1.7"
            color="gray.700"
            _dark={{ color: "gray.300" }}
            minH="1.5em"
          >
            {displayText}
            {isHovered && displayText !== description && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ borderRight: "2px solid currentColor" }}
              />
            )}
          </MotionText>
        </Card.Body>
      </motion.div>

      {/* Tags */}
      <motion.div variants={childVariants}>
        <Card.Footer
          display="flex"
          gap={{ base: 2, md: 3 }}
          flexWrap="wrap"
          pt={0}
        >
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              variants={tagVariants}
              whileHover="hover"
              custom={index}
            >
              <Tag.Root
                size={{ base: "md", md: "lg" }}
                variant="subtle"
                colorScheme="blue"
                borderRadius="full"
              >
                <Tag.Label fontWeight="medium">{tag}</Tag.Label>
              </Tag.Root>
            </motion.div>
          ))}
        </Card.Footer>
      </motion.div>

      {/* Subtle background animation on hover */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)",
          borderRadius: "inherit",
          zIndex: -1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </MotionCard>
  );
};
