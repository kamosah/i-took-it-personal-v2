"use client";

import { Box, Heading, Text, Container, Stack } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RevealFx } from "../once-ui/components";
import { ExperienceCard } from "../components/ui/experience-card";
import EXPERIENCES from "../data/experiences.json";

// Create motion components
const MotionContainer = motion.create(Container);
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionStack = motion.create(Stack);

export default function Index() {
  const experienceRef = useRef(null);
  const isExperienceInView = useInView(experienceRef, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <MotionBox
      minH="100vh"
      bg="linear-gradient(-45deg, #f7fafc, #edf2f7, #e2e8f0, #cbd5e0)"
      backgroundSize="400% 400%"
      _dark={{
        bg: "linear-gradient(-45deg, #1a202c, #2d3748, #4a5568, #2b6cb0)",
        backgroundSize: "400% 400%",
      }}
      variants={containerVariants}
      initial="hidden"
      animate={{
        ...containerVariants.visible,
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        ...containerVariants.visible.transition,
        backgroundPosition: {
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        },
      }}
    >
      {/* Welcome Section */}
      <Box as="main" maxW="1200px" mx="auto" px={4} py={8}>
        <Box textAlign="center" py={10}>
          <RevealFx
            fillWidth
            horizontal="start"
            paddingTop="16"
            paddingBottom="32"
            paddingLeft="12"
          >
            <Heading as="h1" size="2xl" mb={4}>
              Welcome to My Blog
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="4"
            fillWidth
            horizontal="start"
            paddingBottom="16"
          >
            <Text fontSize="xl" color="gray.600">
              Exploring technology, development, and personal growth
            </Text>
          </RevealFx>
        </Box>

        {/* Experience Section */}
        <MotionContainer
          maxW={{
            base: "container.sm",
            md: "container.md",
            lg: "container.lg",
          }}
          px={{ base: 4, md: 6, lg: 8 }}
          py={{ base: 8, md: 12, lg: 16 }}
        >
          <MotionBox
            ref={experienceRef}
            textAlign="center"
            mb={{ base: 8, md: 12 }}
            variants={{
              hidden: { opacity: 0, y: -30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            initial="hidden"
            animate={isExperienceInView ? "visible" : "hidden"}
          >
            <MotionHeading
              as="h2"
              size={{ base: "2xl", md: "3xl", lg: "4xl" }}
              mb={{ base: 4, md: 6 }}
              bgGradient="linear(to-r, blue.600, purple.600)"
              bgClip="text"
              fontWeight="extrabold"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              Work Experience
            </MotionHeading>
            {/* <MotionText
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="2xl"
            mx="auto"
            lineHeight="1.6"
            variants={textVariants}
          >
            A journey through my professional development in software
            engineering
          </MotionText> */}
          </MotionBox>

          <MotionStack
            gap={{ base: 8, md: 12 }}
            w="full"
            maxW="none"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {EXPERIENCES.map((experience, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
              >
                <ExperienceCard
                  title={experience.title}
                  company={experience.company}
                  location={experience.location}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  description={experience.description}
                  tags={experience.tags}
                  logo={experience.logo}
                />
              </motion.div>
            ))}
          </MotionStack>
        </MotionContainer>
      </Box>
    </MotionBox>
  );
}
