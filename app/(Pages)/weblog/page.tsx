import { permanentRedirect } from "next/navigation";

export default function WeblogPage() {
  permanentRedirect("/blog");
}
