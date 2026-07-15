"use client";

import React from "react";
import { Clock, DollarSign, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface ProjectListData {
  id: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  budget: string;
  duration: string;
  teamSize: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status?: "active" | "pending" | "completed";
}

interface ProjectListCardProps {
  project: ProjectListData;
}

const difficultyColors = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-blue-50 text-blue-700 border-blue-200",
  Advanced: "bg-violet-50 text-violet-700 border-violet-200",
};

const statusColors = {
  active: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-slate-100 text-slate-600",
};

export default function ProjectListCard({ project }: ProjectListCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
            {project.status && (
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusColors[project.status]}`}>
                {project.status}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">{project.company}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${difficultyColors[project.difficulty]}`}>
          {project.difficulty}
        </span>
      </div>
      
      <p className="text-sm text-slate-600 line-clamp-2 mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-600">
            {skill}
          </span>
        ))}
        {project.skills.length > 4 && (
          <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-500">
            +{project.skills.length - 4}
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <DollarSign size={12} className="text-[#2563EB]" />
            <span className="font-semibold">{project.budget}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock size={12} className="text-[#06B6D4]" />
            <span className="font-semibold">{project.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Users size={12} className="text-violet-500" />
            <span className="font-semibold">{project.teamSize}</span>
          </div>
        </div>
        
        <Link
          href={`/dashboard/projects/discover/${project.id}`}
          className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
        >
          View Details
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
