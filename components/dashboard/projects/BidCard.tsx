"use client";

import React from "react";
import { Clock, DollarSign, Calendar, Eye, X, ExternalLink } from "lucide-react";

export interface BidData {
  id: string;
  projectTitle: string;
  company: string;
  description: string;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
  bidAmount: string;
  estTime: string;
  submittedDate: string;
  feedback?: string;
}

interface BidCardProps {
  bid: BidData;
  onViewProposal?: () => void;
  onWithdraw?: () => void;
  onOpenProject?: () => void;
}

const statusColors = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  withdrawn: "bg-slate-50 text-slate-600 border-slate-200",
};

export default function BidCard({ bid, onViewProposal, onWithdraw, onOpenProject }: BidCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">{bid.projectTitle[0]}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 truncate">{bid.projectTitle}</h3>
              <p className="text-xs text-slate-500">{bid.company}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider shrink-0 ${statusColors[bid.status]}`}>
              {bid.status}
            </span>
          </div>
          
          <p className="text-sm text-slate-600 line-clamp-2 mb-4">{bid.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <DollarSign size={12} className="text-[#2563EB]" />
              <span className="font-semibold">Your Bid: {bid.bidAmount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Clock size={12} className="text-[#06B6D4]" />
              <span className="font-semibold">Est. Time: {bid.estTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Calendar size={12} className="text-slate-400" />
              <span>{bid.submittedDate}</span>
            </div>
          </div>
          
          {bid.feedback && bid.status === "rejected" && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-lg">
              <p className="text-xs text-rose-700 font-medium">{bid.feedback}</p>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <button
              onClick={onViewProposal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              <Eye size={12} />
              View Proposal
            </button>
            
            {bid.status === "pending" && onWithdraw && (
              <button
                onClick={onWithdraw}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 transition-colors"
              >
                <X size={12} />
                Withdraw
              </button>
            )}
            
            {bid.status === "accepted" && onOpenProject && (
              <button
                onClick={onOpenProject}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-700 transition-colors"
              >
                <ExternalLink size={12} />
                Open Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
