"use client";
import React from "react";
import {
  Card,
  Box,
  Flex,
  Text,
  Inset,
  Strong,
  Heading,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";

export interface IAppProps {
  title: string;
  description: string;
  link?: string; // Assuming Url is a type you have defined elsewhere
  github?: string;
  imageAdress?: string;
  size?: string;
  status: string;
}
export default function App(props: IAppProps) {
  return (
    <Box>
      <Card size={"2"} variant="surface">
        {/* Image */}
        <Inset clip="padding-box" side="top" pb="current">
          <Link href={props.link ? props.link : "/"}>
            <Image
              width={500}
              height={100}
              src={props.imageAdress || "/blakfy-orginal-icon.jpg"}
              alt={props.title}
              className="aspect-video block object-cover bg-gray-200"
            />
          </Link>
        </Inset>

        {/* Title */}
        <Flex direction={"column"} gap={"2"} my={"1"} className={props.size}>
          <Heading as="h4" size={{ initial: "3", xs: "4" }}>
            <Strong>
              {props.title && props.title.length < 20
                ? props.title
                : (props.title || "Untitled").substring(0, 30).concat("...")}
            </Strong>
          </Heading>

          <Text as="p" size="3">
            {props.description && props.description.length < 120
              ? props.description.substring(0, 120)
              : (props.description || "No description")
                  .substring(0, 120)
                  .concat("...")}
          </Text>
        </Flex>

        {/* Stream Link */}
        <Flex justify={"end"} align={"end"} gap={"5"} my={"3"}>
          <Text
            as="p"
            size={"2"}
            color={props.status === "active" ? "yellow" : "red"}
          >
            {props.status}
          </Text>
          <Link href={props.github ? props.github : "/"}>
            <GitHubLogoIcon className="w-auto h-6" />
          </Link>
          <Link href={props.link ? props.link : "/"}>
            <Link2Icon className="w-auto h-6" />
          </Link>
        </Flex>
      </Card>
    </Box>
  );
}
