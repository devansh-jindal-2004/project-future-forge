import React from "react";
import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import ProgressBar from "@/components/dashboard/shared/ProgressBar";
import EmptyState from "@/components/dashboard/shared/EmptyState";
import type { ActiveProject, ProjectStatus } from "@/types/dashboard";

const statusBadge: Record<ProjectStatus, { label: string; cls: string }> = {
    "in-progress": { label: "In Progress", cls: "bg-blue-50 text-blue-600 border-blue-100" },
    completed: { label: "Completed", cls: "bg-green-50 text-green-600 border-green-100" },
    "review-requested": { label: "Review Requested", cls: "bg-amber-50 text-amber-600 border-amber-100" },
    "under-review": { label: "Under Review", cls: "bg-purple-50 text-purple-600 border-purple-100" },
};

export default function ActiveProjects({ projects }: { projects: ActiveProject[] }) {
    return (
        <DashboardCard className="p-5 col-span-full lg:col-span-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-[#1A1A1A] tracking-tight">Active Projects</h2>
                <Link href="/dashboard/projects/discover" className="text-xs text-[#C08A1E] font-bold hover:text-[#A6740F] flex items-center gap-1">
                    View All <ArrowRight size={12} />
                </Link>
            </div>

            {projects.length === 0 ? (
                <EmptyState
                    icon={<FolderKanban size={20} />}
                    title="No active projects"
                    description="Build real-world projects to showcase your skills"
                    actionLabel="Discover Projects"
                    actionHref="/dashboard/projects/discover"
                    size="sm"
                />
            ) : (
                <div className="space-y-3">
                    {projects.map((project) => {
                        const badge = statusBadge[project.status];
                        return (
                            <Link
                                key={project.id}
                                href={`/dashboard/projects/${project.slug}`}
                                className="flex gap-3 p-3 bg-[#FDF9F2] rounded-2xl border border-[rgba(192,138,30,0.12)] hover:border-[rgba(192,138,30,0.3)] hover:shadow-sm transition-all group block"
                            >
                                {/* Icon */}
                                <div className="h-12 w-12 shrink-0 rounded-xl bg-[#0B1220] flex items-center justify-center border border-white/10">
                                    <FolderKanban size={20} className="text-[#D9A441]" />
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-bold text-[#1A1A1A] truncate group-hover:text-[#C08A1E] transition-colors">
                                            {project.title}
                                        </p>
                                        <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${badge.cls}`}>
                                            {badge.label}
                                        </span>
                                    </div>
                                    <ProgressBar
                                        value={project.progressPercent}
                                        showPercent
                                        height="slim"
                                        className="mt-2"
                                    />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </DashboardCard>
    );
}
