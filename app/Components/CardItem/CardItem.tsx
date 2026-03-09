"use client";
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
  status: string;
  slug?: string;
}
export default function CardItem(props: IAppProps) {
  return (
    <Box className="card-hover">
      <Card size={"1"} variant="surface">
        {/* Image */}
        <Inset clip="padding-box" side="top" pb="current">
          <Flex justify={"center"} align={"center"} className="aspect-[16/10] overflow-hidden">
            <Link href={props.slug ? `/projeler/${props.slug}` : (props.link || "/")} tabIndex={props.slug ? -1 : undefined} aria-hidden={props.slug ? true : undefined}>
              <Image
                width={600}
                height={375}
                src={props.imageAdress || "/blakfy-orginal-icon.jpg"}
                alt={props.slug ? "" : props.title}
                className="block object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </Flex>
        </Inset>

        {/* Title */}
        <Flex direction={"column"} gap={"1"} my={"1"}>
          <Heading as="h4" size={{ initial: "2", xs: "3" }}>
            {props.slug ? (
              <Link href={`/projeler/${props.slug}`} className="hover:text-[var(--green)] transition-colors duration-300">
                <Strong>
                  {props.title && props.title.length < 25
                    ? props.title
                    : (props.title || "Untitled").substring(0, 30).concat("...")}
                </Strong>
              </Link>
            ) : (
              <Strong>
                {props.title && props.title.length < 25
                  ? props.title
                  : (props.title || "Untitled").substring(0, 30).concat("...")}
              </Strong>
            )}
          </Heading>

          <Text as="p" size="1" color="gray" className="line-clamp-2">
            {props.description || "No description"}
          </Text>
        </Flex>

        {/* Stream Link */}
        <Flex justify={"end"} align={"center"} gap={"3"} mt={"2"}>
          <Text
            as="p"
            size={"1"}
            color={props.status === "active" ? "green" : "red"}
          >
            {props.status}
          </Text>
          {props.github && (
            <Link href={props.github} target="_blank" rel="noopener noreferrer" aria-label={`${props.title} GitHub repository (opens in new tab)`}>
              <GitHubLogoIcon className="w-4 h-4 icon-hover" />
            </Link>
          )}
          {props.link && (
            <Link href={props.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${props.title} (opens in new tab)`}>
              <Link2Icon className="w-4 h-4 icon-hover" />
            </Link>
          )}
        </Flex>
      </Card>
    </Box>
  );
}
