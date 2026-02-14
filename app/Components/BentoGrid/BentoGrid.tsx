"use client";
import React from "react";
import FadeInSection from "@/app/Components/FadeInSection";
import BentoHeroCard from "./BentoHeroCard";
import BentoAvatarCard from "./BentoAvatarCard";
import BentoFeaturedProjectCard from "./BentoFeaturedProjectCard";
import BentoBlogCard from "./BentoBlogCard";
import BentoProjectCard from "./BentoProjectCard";
import BentoSocialCard from "./BentoSocialCard";
import BentoBlakfyShowcase from "./BentoBlakfyShowcase";
import BentoCtaCard from "./BentoCtaCard";

interface Project {
	title: string;
	description: string;
	link?: string;
	github?: string;
	imageAdress?: string;
	status: string;
}

interface BlogEntry {
	title?: string;
	date?: string;
	link?: string;
	categories?: string;
}

export default function BentoGrid() {
	const [githubProjects, setGithubProjects] = React.useState<Project[]>([]);
	const [blakfyProjects, setBlakfyProjects] = React.useState<Project[]>([]);
	const [blogPosts, setBlogPosts] = React.useState<BlogEntry[]>([]);
	const [loaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
		Promise.all([
			fetch("/Data/githubProjectData.json").then((r) => r.json()),
			fetch("/Data/blakfyProjectData.json").then((r) => r.json()),
			fetch("/weblog/data/blog.json").then((r) => r.json()),
		])
			.then(([ghData, bfData, blogData]) => {
				setGithubProjects(ghData.laboratory || []);
				setBlakfyProjects(bfData.laboratory || []);
				setBlogPosts(blogData.weBlog || []);
				setLoaded(true);
			})
			.catch(console.error);
	}, []);

	const featuredProject = githubProjects[0];
	const project2 = githubProjects[1];
	const project3 = githubProjects[2];

	const blakfyFeatured = blakfyProjects
		.filter((p) => p.status === "active")
		.slice(0, 3);

	return (
		<div className="bento-grid">
			{/* Hero + Avatar */}
			<FadeInSection className="bento-span-2-col bento-span-2-row">
				<div className="bento-card" style={{ height: "100%" }}>
					<BentoHeroCard />
				</div>
			</FadeInSection>

			<FadeInSection className="bento-span-2-row">
				<div className="bento-card" style={{ height: "100%" }}>
					<BentoAvatarCard />
				</div>
			</FadeInSection>

			{/* Featured Project + Blog */}
			{loaded && featuredProject && (
				<FadeInSection className="bento-span-2-col bento-span-2-row">
					<div
						className="bento-card bento-featured"
						style={{ height: "100%", minHeight: 280 }}
					>
						<BentoFeaturedProjectCard project={featuredProject} />
					</div>
				</FadeInSection>
			)}

			<FadeInSection className="bento-span-2-row">
				<div className="bento-card" style={{ height: "100%" }}>
					<BentoBlogCard posts={blogPosts} loaded={loaded} />
				</div>
			</FadeInSection>

			{/* Two projects + Social */}
			{loaded && project2 && (
				<FadeInSection>
					<div className="bento-card" style={{ height: "100%" }}>
						<BentoProjectCard project={project2} />
					</div>
				</FadeInSection>
			)}

			{loaded && project3 && (
				<FadeInSection>
					<div className="bento-card" style={{ height: "100%" }}>
						<BentoProjectCard project={project3} />
					</div>
				</FadeInSection>
			)}

			<FadeInSection>
				<div className="bento-card" style={{ height: "100%" }}>
					<BentoSocialCard />
				</div>
			</FadeInSection>

			{/* Blakfy Showcase + CTA */}
			{loaded && blakfyFeatured.length > 0 && (
				<FadeInSection className="bento-span-2-col">
					<div className="bento-card" style={{ height: "100%" }}>
						<BentoBlakfyShowcase projects={blakfyFeatured} />
					</div>
				</FadeInSection>
			)}

			<FadeInSection>
				<div className="bento-card bento-cta" style={{ height: "100%" }}>
					<BentoCtaCard />
				</div>
			</FadeInSection>
		</div>
	);
}
