"use client";
import React from "react";
import { Card, Flex, Text, Inset, Strong, Heading } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";

export interface IAppProps {
  title: string;
  description: string;
  link?: string; // Assuming Url is a type you have defined elsewhere
  github?: string;
  imageAdress?: string;
}
export default function App(props: IAppProps) {
  return (
    <Card size={"2"} className="grid grid-colums-1 initial:mx-2 xs:mx-0">
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

      <Heading as="h4" size={{ initial: "3", xs: "4" }} my={"3"}>
        <Strong>
          {props.title && props.title.length < 20
            ? props.title
            : (props.title || "Untitled").substring(0, 30).concat("...")}
        </Strong>{" "}
      </Heading>

      <Text
        as="p"
        size="3"
        className=" sm:min-h-36 sm:h-44 md:h-36 lg:h-36 xl:h-40"
      >
        {props.description && props.description.length < 120
          ? props.description.substring(0, 120)
          : (props.description || "No description")
              .substring(0, 120)
              .concat("...")}
      </Text>
      {/* Stream Link */}
      <Flex
        gap={"5"}
        justify={"end"}
        align={"center"}
        className="initial:h-20 xs:h-6"
      >
        <Link href={props.github ? props.github : "/"}>
          <GitHubLogoIcon className="w-auto h-6" />
        </Link>
        <Link href={props.link ? props.link : "/"}>
          <Link2Icon className="w-auto h-6" />
        </Link>
      </Flex>
    </Card>
  );
}
