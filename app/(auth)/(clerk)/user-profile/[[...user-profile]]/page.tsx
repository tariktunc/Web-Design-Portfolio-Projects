import { UserProfile } from "@clerk/nextjs";

export default function Home() {
	return <UserProfile path="/user-profile" routing="path" />;
}
