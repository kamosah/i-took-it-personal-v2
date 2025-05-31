"use client";

import { Container, Heading, Stack, Text, Box } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExperienceCard } from "../../components/ui/experience-card";
import EXPERIENCES from "../../data/experiences.json";
import "./experience.css";

// Create motion components
const MotionContainer = motion.create(Container);
const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionStack = motion.create(Stack);

export default function ExperiencePage() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

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

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <MotionBox
      minH="100vh"
      className="animated-background"
      _dark={{
        bg: "gradient-to-br from-gray.900 via-gray.800 to-blue.900",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionContainer
        maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }}
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 8, md: 12, lg: 16 }}
      >
        <MotionBox
          ref={headerRef}
          textAlign="center"
          mb={{ base: 8, md: 12 }}
          className="page-header"
          variants={headerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
        >
          <MotionHeading
            as="h1"
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
          <MotionText
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
          </MotionText>
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
    </MotionBox>
  );
}
