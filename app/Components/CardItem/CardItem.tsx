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
  link?: string;
  github?: string;
  imageAdress?: string;
  size?: string;
  status: string;
}
export default function CardItem(props: IAppProps) {
  return (
    <Box className="card-hover">
      <Card size={"2"} variant="surface">
        {/* Image */}
        <Inset clip="padding-box" side="top" pb="current">
          <Flex justify={"center"} align={"center"} className="aspect-video overflow-hidden">
            <Link href={props.link ? props.link : "/"}>
              <Image
                width={1000}
                height={1000}
                src={props.imageAdress || "/blakfy-orginal-icon.jpg"}
                alt={props.title}
                className="aspect-video block object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </Flex>
        </Inset>

        {/* Title */}
        <Flex direction={"column"} gap={"2"} my={"2"} className={props.size}>
          <Heading as="h4" size={{ initial: "3", xs: "4" }}>
            <Strong>
              {props.title && props.title.length < 20
                ? props.title
                : (props.title || "Untitled").substring(0, 30).concat("...")}
            </Strong>
          </Heading>

          <Text as="p" size="2" color="gray" className="line-clamp-3">
            {props.description || "No description"}
          </Text>
        </Flex>

        {/* Stream Link */}
        <Flex justify={"end"} align={"center"} gap={"4"} mt={"3"}>
          <Text
            as="p"
            size={"2"}
            color={props.status === "active" ? "green" : "red"}
          >
            {props.status}
          </Text>
          <Link href={props.github || "/"} target="_blank" rel="noopener noreferrer" aria-label={`${props.title} GitHub repository`}>
            <GitHubLogoIcon className="w-5 h-5 icon-hover" />
          </Link>
          <Link href={props.link || "/"} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${props.title}`}>
            <Link2Icon className="w-5 h-5 icon-hover" />
          </Link>
        </Flex>
      </Card>
    </Box>
  );
}
