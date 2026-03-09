"use client";
import React from "react";
import { Flex, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../Motion/MotionWrappers";

export default function Avatars() {
	return (
		<Flex mr={"5"} direction={"column"} justify={"center"} align={"center"}>
			{/* Avatar with green glow ring + float animation */}
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
			>
				<motion.div
					animate={{ y: [0, -5, 0] }}
					transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
					className="rounded-full shadow-[0_0_20px_rgba(100,255,218,0.15)] hover:shadow-[0_0_30px_rgba(100,255,218,0.3)] transition-shadow duration-500"
				>
					<Avatar size="9" src="/profilePhoto.jpg" radius="full" fallback="T" />
				</motion.div>
			</motion.div>

			{/* Social icons with stagger */}
			<StaggerContainer className="mt-2">
				<Flex align={"center"} justify={"center"} gap={"2"} height={"6"}>
					{[
						{ href: "https://linkedin.com/in/tarktunc", icon: "linkedin", label: "LinkedIn profile" },
						{ href: "https://twitter.com/tarkktunc", icon: "twitter", label: "Twitter profile" },
						{ href: "https://github.com/tariktunc", icon: "github", label: "GitHub profile" },
					].map((social) => (
						<StaggerItem key={social.icon}>
							<Link href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
								<Image
									src={`https://skillicons.dev/icons?i=${social.icon}`}
									alt={social.label}
									width={20}
									height={20}
									className="hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(100,255,218,0.5)] transition-all duration-300"
								/>
							</Link>
						</StaggerItem>
					))}
				</Flex>
			</StaggerContainer>
		</Flex>
	);
}
