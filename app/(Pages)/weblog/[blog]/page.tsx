import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ blog: string }>;
}) {
  const { blog } = await params;
  redirect(`/post/${blog}`);
}
