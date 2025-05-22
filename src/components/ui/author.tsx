import {
  Avatar,
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getImageProps } from "next/image";
import { LuExternalLink as LuExternalLinkIcon } from "react-icons/lu";

interface AuthorProps {
  avatar: string;
  githubLink?: string;
  linkedInLink: string;
  name: string;
  twitterLink: string;
  websiteLink?: string;
}

export function Author(props: AuthorProps) {
  const { avatar, name, linkedInLink } = props;
  const imageProps = getImageProps({
    src: avatar,
    alt: name,
    width: 277,
    height: 277,
  });
  const getHandle = (link: string) => {
    return link.split("/").pop();
  };
  const handle = getHandle(linkedInLink);
  return (
    <HStack gap="4">
      <Avatar.Root size={{ base: "sm", md: "md" }}>
        <Avatar.Fallback name={name} />
        <Avatar.Image {...imageProps} src={avatar} />
      </Avatar.Root>
      <Stack gap="0">
        <Text fontWeight="medium">{name}</Text>
        <ChakraLink target="_blank" href={linkedInLink}>
          <Text color="fg.muted" textStyle="sm">
            @{handle}
          </Text>
          <LuExternalLinkIcon />
        </ChakraLink>
      </Stack>
    </HStack>
  );
}
