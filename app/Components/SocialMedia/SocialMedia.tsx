"use client";
import * as React from "react";
import { Flex, Box, Container, Text, Heading } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export interface IAppProps {}
export default function App(props: IAppProps) {
  const socialMedia = [
    {
      name: "LinkedIn",
      ImageUrl: "https://skillicons.dev/icons?i=linkedin",
      link: "https://www.linkedin.com/in/blakfy/",
    },
    {
      name: "Github",
      ImageUrl: "https://skillicons.dev/icons?i=github",
      link: "https://github.com/tariktunc",
    },
    {
      name: "Discord",
      ImageUrl: "https://skillicons.dev/icons?i=discord",
      link: "https://discord.com/dfasweq",
    },
    {
      name: "Twitter",
      ImageUrl: "https://skillicons.dev/icons?i=twitter",
      link: "https://twitter.com",
    },
    {
      name: "Blakfy.com",
      ImageUrl: "https://skillicons.dev/icons?i=edge",
      link: "https://blakfy.com",
    },
    {
      name: "Spotify",
      ImageUrl: "https://skillicons.dev/icons?i=spotify",
      link: "https://spotify.com",
    },
    {
      name: "Medium",
      ImageUrl: "https://skillicons.dev/icons?i=medium",
      link: "https://https://medium.com",
    },
    {
      name: "Instagram",
      ImageUrl: "https://skillicons.dev/icons?i=instagram",
      link: "https://instagram.com",
    },
    {
      name: "Stackoverflow",
      ImageUrl: "https://skillicons.dev/icons?i=stackoverflow",
      link: "https://stackoverflow.com",
    },
  ];
  return (
    <Flex wrap={"wrap"} justify={"center"}>
      {socialMedia &&
        socialMedia.map((social, index) => (
          <Flex
            m={{ initial: "2", xs: "3" }}
            align={"center"}
            key={index}
            width={"max-content"}
            height={"max-content"}
            gap={"2"}
            className="cursor-pointer"
          >
            <Image
              src={social.ImageUrl}
              alt={social.name}
              width={100}
              height={100}
              className="initial:w-5 initial:h-5 xs:w-20 xs:w-20"
            />
            <Link
              href={social.link ? social.link : "https://www.google.com"}
              target="_blank"
            >
              <Text as="p" size={"2"}>
                {social.name}
              </Text>
            </Link>
          </Flex>
        ))}
    </Flex>
  );
}
