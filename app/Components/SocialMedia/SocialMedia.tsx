"use client";
import { Flex, Text, Heading } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useAnimeStagger, useAnimeScrollReveal } from "@/app/hooks/useAnime";

const socialMedia = [
  { name: "LinkedIn", ImageUrl: "https://skillicons.dev/icons?i=linkedin", link: "https://www.linkedin.com/in/tarktunc/" },
  { name: "Github", ImageUrl: "https://skillicons.dev/icons?i=github", link: "https://github.com/tariktunc" },
  { name: "Discord", ImageUrl: "https://skillicons.dev/icons?i=discord", link: "https://discord.com/kZWEEvmQAK" },
  { name: "Twitter", ImageUrl: "https://skillicons.dev/icons?i=twitter", link: "https://twitter.com/tarkktunc" },
  { name: "Blakfy.com", ImageUrl: "/blakfy-orginal-icon.jpg", link: "https://blakfy.com" },
  { name: "Spotify", ImageUrl: "/spotify.png", link: "https://open.spotify.com/user/11177763987?si=8cccd8e276de4963" },
  { name: "Medium", ImageUrl: "/medium.png", link: "https://medium.com/@tariktunc" },
  { name: "Instagram", ImageUrl: "https://skillicons.dev/icons?i=instagram", link: "https://www.instagram.com/tarkktunc/" },
  { name: "Stackoverflow", ImageUrl: "https://skillicons.dev/icons?i=stackoverflow", link: "https://stackoverflow.com/users/21361438/tar%c4%b1k-tunc" },
];

export default function SocialMedia() {
  const headingRef = useAnimeScrollReveal(".social-heading", {
    translateX: [-60, 0],
    translateY: [0, 0],
    duration: 800,
  });
  const staggerRef = useAnimeStagger(".social-item", {
    delay: 80,
    from: "first",
  });

  return (
    <Flex direction="column" gap="3" my="6">
      <div ref={headingRef}>
        <Heading
          as="h2"
          size={{ initial: "4", xs: "5" }}
          className="social-heading section-header"
        >
          Connect
        </Heading>
      </div>
      <div ref={staggerRef} className="flex flex-wrap gap-3 mt-2">
        {socialMedia.map((social) => (
          <div className="social-item" key={social.name}>
            <Link
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              aria-label={`Visit ${social.name} (opens in new tab)`}
            >
              <Image
                src={social.ImageUrl}
                alt=""
                width={100}
                height={100}
                className="w-6 h-6 rounded-sm"
              />
              <Text as="p" size="2" weight="medium">
                {social.name}
              </Text>
            </Link>
          </div>
        ))}
      </div>
    </Flex>
  );
}
