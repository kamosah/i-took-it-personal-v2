"use client";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

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
import { useColorModeValue } from "./ui/color-mode";

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
  isActive,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}) => {
  // Declare color mode values
  const activeColor = useColorModeValue("blue.600", "blue.300");
  const inactiveColor = useColorModeValue("gray.700", "gray.200");
  const activeBg = useColorModeValue("blue.50", "blue.900");
  const hoverBg = useColorModeValue("blue.100", "gray.700");
  const hoverColor = useColorModeValue("blue.700", "blue.200");

  return (
    <ChakraLink
      as={NextLink}
      href={href}
      px={3}
      py={2}
      rounded="md"
      fontWeight={isActive ? "bold" : "medium"}
      color={isActive ? activeColor : inactiveColor}
      bg={isActive ? activeBg : "transparent"}
      _hover={{
        textDecoration: "none",
        bg: hoverBg,
        color: hoverColor,
      }}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </ChakraLink>
  );
};

const NavBar: React.FC = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  // Use color mode values once at the top
  const bg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const boxShadow = useColorModeValue("sm", "sm-dark");
  const brandColor = useColorModeValue("blue.600", "blue.300");
  const brandHoverColor = useColorModeValue("blue.800", "blue.100");
  return (
    <Box
      as="nav"
      w="100%"
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      px={{ base: 4, md: 8 }}
      py={2}
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow={boxShadow}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo / Brand */}
        <ChakraLink
          href="/"
          as={NextLink}
          display="flex"
          alignItems="center"
          fontWeight="bold"
          fontSize="xl"
          color={brandColor}
          _hover={{
            textDecoration: "none",
            color: brandHoverColor,
          }}
          aria-label="Go to home page"
        >
          <Text fontFamily="heading" letterSpacing="tight">
            Kwame&apos;s Blog
          </Text>
        </ChakraLink>

        {/* Desktop Nav */}
        <HStack as="nav" gap={2} display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.path}
              isActive={pathname === link.path}
            >
              {link.name}
            </NavLink>
          ))}
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
                  <NavLink
                    key={link.name}
                    href={link.path}
                    isActive={pathname === link.path}
                    onClick={onClose}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
          {/* TODO: Fix close button. Should only display on mobile */}
          <Flex justify="flex-end">
            <Drawer.CloseTrigger asChild>
              <CloseButton onClick={onClose} size="sm" />
            </Drawer.CloseTrigger>
          </Flex>
        </Drawer.Root>
      </Box>
    </Box>
  );
};

export default NavBar;
