import Link from "next/link";
import { Text } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function BentoCtaCard() {
	return (
		<div className="bento-card-inner bento-cta">
			<Text size={{ initial: "1", xs: "2" }} color="gray" weight="medium">
				React / Next.js / TypeScript / Tailwind
			</Text>
			<Link href="/whoami" className="bento-cta-button">
				About Me <ArrowRightIcon />
			</Link>
		</div>
	);
}
