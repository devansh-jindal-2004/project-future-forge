import type { Metadata } from "next";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";

export const metadata: Metadata = {
  title: "Create Project",
  description: "Create and publish a new project for contributors.",
};

export default function CreateProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
          Create Project
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-1">
          Create and publish a new project for contributors.
        </p>
      </div>

      <DashboardCard className="p-8">
        <p className="text-sm text-[#6B6B6B]">
          Create project content placeholder.
        </p>
      </DashboardCard>
    </div>
  );
}
