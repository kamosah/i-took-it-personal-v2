"use client";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NextLink from "next/link";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link as ChakraLink,
  useDisclosure,
  Stack,
  Text,
  Drawer,
  CloseButton,
} from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blog Posts", path: "/blog" },
  { name: "Resume", path: "/resume" },
  { name: "Contact", path: "/contact" },
];

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <ChakraLink
      px={3}
      py={2}
      rounded="md"
      fontWeight="medium"
      color={{
        base: "gray.700",
        _dark: "gray.200",
      }}
      bg={{
        base: "transparent",
        _dark: "transparent",
      }}
      _hover={{
        textDecoration: "none",
        bg: {
          base: "blue.100",
          _dark: "gray.700",
        },
        color: {
          base: "blue.700",
          _dark: "blue.200",
        },
      }}
      onClick={onClick}
      as={NextLink}
      href={href}
    >
      {children}
    </ChakraLink>
  );
};

const NavBar: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <Box
      as="nav"
      w="100%"
      bg={{ base: "white", _dark: "gray.900" }}
      borderBottom="1px"
      borderColor={{ base: "gray.200", _dark: "gray.700" }}
      px={{ base: 4, md: 8 }}
      py={2}
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow={{ base: "sm", _dark: "sm-dark" }}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <ChakraLink
          display="flex"
          alignItems="center"
          fontWeight="bold"
          fontSize="xl"
          color={{ base: "blue.600", _dark: "blue.300" }}
          _hover={{
            textDecoration: "none",
            color: {
              base: "blue.800",
              _dark: "blue.100",
            },
          }}
          aria-label="Go to home page"
          as={NextLink}
          href="/"
        >
          <Text fontFamily="heading" letterSpacing="tight">
            Kwame&apos;s Blog
          </Text>
        </ChakraLink>

        {/* Desktop Nav */}
        <HStack
          as="nav"
          gap={2}
          display={{ base: "none", md: "flex" }}
          alignItems="center"
        >
          {navLinks.map((link) => (
            <NavLink key={link.name} href={link.path}>
              {link.name}
            </NavLink>
          ))}
          <ColorModeButton /> {/* Add ColorModeButton here */}
        </HStack>

        {/* Mobile Hamburger */}
        <IconButton
          aria-label="Open menu"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="ghost"
          size="md"
        >
          <GiHamburgerMenu />
        </IconButton>
      </Flex>

      {/* Mobile Drawer */}
      <Box display={{ base: "flex", md: "none" }}>
        <Drawer.Root placement="start" open={open}>
          <Drawer.Content>
            <Drawer.Body>
              <Stack as="nav" gap={4} mt={8}>
                {navLinks.map((link) => (
                  <NavLink key={link.name} href={link.path} onClick={onClose}>
                    {link.name}
                  </NavLink>
                ))}
              </Stack>
              <ColorModeButton alignSelf="flex-start" mt={4} />
            </Drawer.Body>
            <Drawer.CloseTrigger
              asChild
              position="absolute"
              top="8px"
              right="8px"
              onClick={onClose}
            >
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Root>
      </Box>
    </Box>
  );
};

export default NavBar;
