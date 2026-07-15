import type { Metadata } from "next";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";

export const metadata: Metadata = {
  title: "Discover Projects",
  description: "Browse and discover projects available to you.",
};

export default function DiscoverProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
          Discover Projects
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-1">
          Browse and discover projects available to you.
        </p>
      </div>

      <DashboardCard className="p-8">
        <p className="text-sm text-[#6B6B6B]">
          Discover projects content placeholder.
        </p>
      </DashboardCard>
    </div>
  );
}
