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
      link: "https://www.linkedin.com/in/tarktunc/",
    },
    {
      name: "Github",
      ImageUrl: "https://skillicons.dev/icons?i=github",
      link: "https://github.com/tariktunc",
    },
    {
      name: "Discord",
      ImageUrl: "https://skillicons.dev/icons?i=discord",
      link: "https://discord.com/kZWEEvmQAK",
    },
    {
      name: "Twitter",
      ImageUrl: "https://skillicons.dev/icons?i=twitter",
      link: "https://twitter.com/tarkktunc",
    },
    {
      name: "Blakfy.com",
      ImageUrl: "/blakfy-orginal-icon.jpg",
      link: "https://blakfy.com",
    },
    {
      name: "Spotify",
      ImageUrl: "/spotify.png",
      link: "https://open.spotify.com/user/11177763987?si=8cccd8e276de4963",
    },
    {
      name: "Medium",
      ImageUrl: "/medium.png",
      link: "https://medium.com/@tariktunc",
    },
    {
      name: "Instagram",
      ImageUrl: "https://skillicons.dev/icons?i=instagram",
      link: "https://www.instagram.com/tarkktunc/",
    },
    {
      name: "Stackoverflow",
      ImageUrl: "https://skillicons.dev/icons?i=stackoverflow",
      link: "https://stackoverflow.com/users/21361438/tar%c4%b1k-tunc",
    },
  ];
  return (
    <Flex wrap={"wrap"} justify={"center"} my={"5"}>
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
              className="initial:w-5 initial:h-5 xs:w-10 xs:h-10"
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
