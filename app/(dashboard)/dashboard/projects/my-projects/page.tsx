import type { Metadata } from "next";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";

export const metadata: Metadata = {
  title: "My Projects",
  description: "View and manage the projects you've joined or created.",
};

export default function MyProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
          My Projects
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-1">
          View and manage the projects you've joined or created.
        </p>
      </div>

      <DashboardCard className="p-8">
        <p className="text-sm text-[#6B6B6B]">
          My projects content placeholder.
        </p>
      </DashboardCard>
    </div>
  );
}
