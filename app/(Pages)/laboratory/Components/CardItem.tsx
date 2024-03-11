"use client";
import React from "react";
import { Card, Flex, Text, Inset, Strong } from "@radix-ui/themes";
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
    <Card size={"2"} className="grid grid-colums-1 ">
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
      <Text
        as="p"
        size="3"
        className=" sm:min-h-40 sm:h-48 md:h-40 lg:h-40 xl:h-44"
      >
        <Strong>
          {props.title && props.title.length < 20
            ? props.title
            : (props.title || "Untitled").substring(0, 30).concat("...")}
        </Strong>

        <br />
        {props.description && props.description.length < 141
          ? props.description.substring(0, 140)
          : (props.description || "No description")
              .substring(0, 140)
              .concat("...")}
      </Text>
      {/* Stream Link */}
      <Flex gap={"5"} justify={"end"} align={"center"} className=" h-8">
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
