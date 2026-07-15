"use client";

import React from "react";
import { X } from "lucide-react";

interface SkillBadgeProps {
  skill: string;
  onRemove?: () => void;
  variant?: "default" | "removable";
}

export default function SkillBadge({ skill, onRemove, variant = "default" }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
      {skill}
      {variant === "removable" && onRemove && (
        <button
          onClick={onRemove}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}
