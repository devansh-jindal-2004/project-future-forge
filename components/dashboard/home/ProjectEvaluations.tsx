import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Scale } from "lucide-react";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import EmptyState from "@/components/dashboard/shared/EmptyState";
import type { ProjectEvaluation, EvaluationStatus } from "@/types/dashboard";

const statusBadge: Record<EvaluationStatus, { label: string; cls: string }> = {
    professional: { label: "Professional", cls: "bg-[rgba(192,138,30,0.1)] text-[#C08A1E] border-[rgba(192,138,30,0.25)]" },
    "in-review": { label: "In Review", cls: "bg-blue-50 text-blue-600 border-blue-100" },
    pending: { label: "Pending", cls: "bg-slate-100 text-slate-500 border-slate-200" },
    completed: { label: "Completed", cls: "bg-green-50 text-green-600 border-green-100" },
};

export default function ProjectEvaluations({ evaluations }: { evaluations: ProjectEvaluation[] }) {
    return (
        <DashboardCard className="p-5 col-span-full lg:col-span-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-[#1A1A1A] tracking-tight">Project Evaluations</h2>
                <Link href="/dashboard/evaluations" className="text-xs text-[#C08A1E] font-bold hover:text-[#A6740F] flex items-center gap-1">
                    View All <ArrowRight size={12} />
                </Link>
            </div>

            {evaluations.length === 0 ? (
                <EmptyState
                    icon={<Scale size={20} />}
                    title="No evaluations yet"
                    description="Submit your projects to receive professional feedback"
                    actionLabel="My Projects"
                    actionHref="/dashboard/projects/my-projects"
                    size="sm"
                />
            ) : (
                <div className="space-y-2.5">
                    {evaluations.map((ev) => {
                        const badge = statusBadge[ev.status];
                        return (
                            <div key={ev.id} className="flex items-center gap-3 p-3 bg-[#FDF9F2] rounded-xl border border-[rgba(192,138,30,0.1)] hover:border-[rgba(192,138,30,0.25)] transition-colors">
                                {/* Project icon */}
                                <div className="h-9 w-9 shrink-0 rounded-lg bg-[#0B1220] flex items-center justify-center">
                                    <Star size={15} className="text-[#D9A441]" />
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-[#1A1A1A] truncate">{ev.projectTitle}</p>
                                    {ev.evaluatorName && (
                                        <p className="text-[10px] text-[#6B6B6B] mt-0.5">by {ev.evaluatorName}</p>
                                    )}
                                </div>
                                {/* Score or badge */}
                                <div className="shrink-0 text-right">
                                    {ev.score != null ? (
                                        <div className="flex items-center gap-1">
                                            <Star size={12} className="text-amber-500 fill-amber-400" />
                                            <span className="text-sm font-black text-[#1A1A1A]">{ev.score}/{ev.maxScore}</span>
                                        </div>
                                    ) : (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.cls}`}>
                                            {badge.label}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <Link
                href="/dashboard/evaluations"
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-[rgba(192,138,30,0.25)] text-xs font-bold text-[#C08A1E] hover:bg-[rgba(192,138,30,0.06)] transition-colors"
            >
                Go to Evaluations Center <ArrowRight size={12} />
            </Link>
        </DashboardCard>
    );
}
