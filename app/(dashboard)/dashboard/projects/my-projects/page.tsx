import type { Metadata } from "next";
import MyProjectsContent from "@/components/dashboard/projects/MyProjectsContent";

export const metadata: Metadata = {
  title: "My Projects",
  description: "View and manage the projects you've joined or created.",
};

export default function MyProjectsPage() {
  return <MyProjectsContent />;
}
