import type { Metadata } from "next";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";

export const metadata: Metadata = {
  title: "Applications",
  description: "Track applications you've submitted or received.",
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
          Applications
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-1">
          Track applications you've submitted or received.
        </p>
      </div>

      <DashboardCard className="p-8">
        <p className="text-sm text-[#6B6B6B]">
          Applications content placeholder.
        </p>
      </DashboardCard>
    </div>
  );
}
