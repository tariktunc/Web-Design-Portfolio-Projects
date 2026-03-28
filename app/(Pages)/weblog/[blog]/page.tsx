import { permanentRedirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ blog: string }>;
}) {
  const { blog } = await params;
  permanentRedirect(`/post/${blog}`);
}
