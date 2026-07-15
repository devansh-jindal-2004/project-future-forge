import type { Metadata } from "next";
import CreateProjectContent from "@/components/dashboard/projects/CreateProjectContent";

export const metadata: Metadata = {
  title: "Create Project",
  description: "Create and publish a new project for contributors.",
};

export default function CreateProjectPage() {
  return <CreateProjectContent />;
}
