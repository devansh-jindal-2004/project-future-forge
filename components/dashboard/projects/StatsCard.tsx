"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-emerald-50 text-emerald-600 border-emerald-100",
  purple: "bg-violet-50 text-violet-600 border-violet-100",
  orange: "bg-amber-50 text-amber-600 border-amber-100",
  red: "bg-rose-50 text-rose-600 border-rose-100",
};

export default function StatsCard({ title, value, icon: Icon, trend, color = "blue" }: StatsCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-black text-slate-900">{value}</p>
          {trend && (
            <p className="text-xs font-semibold text-emerald-600">{trend}</p>
          )}
        </div>
        <div className={`p-2.5 rounded-xl border ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
