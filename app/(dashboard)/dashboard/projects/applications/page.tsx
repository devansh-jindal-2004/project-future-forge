import type { Metadata } from "next";
import ApplicationsContent from "@/components/dashboard/projects/ApplicationsContent";

export const metadata: Metadata = {
  title: "Applications",
  description: "Track applications you've submitted or received.",
};

export default function ApplicationsPage() {
  return <ApplicationsContent />;
}
