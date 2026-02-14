"use client";
import * as React from "react";
import { Flex, Text } from "@radix-ui/themes";
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
    <Flex wrap={"wrap"} justify={"center"} gap={"4"} my={"6"}>
      {socialMedia.map((social, index) => (
        <Link
          href={social.link}
          target="_blank"
          key={index}
          className="social-hover"
        >
          <Flex
            align={"center"}
            gap={"2"}
            px={"3"}
            py={"2"}
            className="rounded-md"
          >
            <Image
              src={social.ImageUrl}
              alt={social.name}
              width={100}
              height={100}
              className="initial:w-6 initial:h-6 xs:w-8 xs:h-8 rounded-sm"
            />
            <Text as="p" size={"2"}>
              {social.name}
            </Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
}
