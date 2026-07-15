"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import StatsCard from "@/components/dashboard/projects/StatsCard";
import SectionHeading from "@/components/dashboard/projects/SectionHeading";
import SkillBadge from "@/components/dashboard/projects/SkillBadge";
import { 
  Send, 
  Filter, 
  RefreshCw, 
  Search, 
  Grid3x3, 
  List, 
  Calendar,
  DollarSign,
  Clock,
  User,
  Building2,
  CheckCircle2,
  XCircle,
  Hourglass,
  MessageSquare,
  Eye,
  Edit,
  X,
  Plus,
  UserPlus,
  Briefcase,
  Award,
  AlertCircle,
  ChevronRight,
  Bell,
  ToggleLeft,
  ToggleRight,
  Star
} from "lucide-react";
import Link from "next/link";

// Mock data
const statsData = [
  { title: "Applications Sent", value: "24", icon: Send, trend: "+3 this week", color: "blue" as const },
  { title: "Applications Received", value: "12", icon: Bell, trend: "+5 this week", color: "green" as const },
  { title: "Accepted", value: "8", icon: CheckCircle2, trend: "+2 this week", color: "green" as const },
  { title: "Pending Review", value: "16", icon: Hourglass, trend: "4 urgent", color: "orange" as const },
];

const applications = [
  {
    id: "1",
    projectTitle: "AI-Powered Customer Service Platform",
    organization: "TechCorp Inc.",
    description: "Building an intelligent customer service platform using NLP and ML to automate support tickets.",
    appliedRole: "Lead Developer",
    applicationDate: "Nov 15, 2026",
    deadline: "Nov 30, 2026",
    budget: "$15,000 - $25,000",
    projectType: "AI/ML",
    skills: ["Python", "TensorFlow", "React", "Node.js"],
    status: "pending" as ApplicationStatus,
  },
  {
    id: "2",
    projectTitle: "E-commerce Mobile App Redesign",
    organization: "RetailMax",
    description: "Redesigning the mobile shopping experience with focus on UX/UI improvements and performance.",
    appliedRole: "UI/UX Designer",
    applicationDate: "Nov 10, 2026",
    deadline: "Nov 25, 2026",
    budget: "$8,000 - $12,000",
    projectType: "Mobile Development",
    skills: ["React Native", "TypeScript", "Figma"],
    status: "accepted" as ApplicationStatus,
  },
  {
    id: "3",
    projectTitle: "Blockchain Supply Chain Tracker",
    organization: "LogiChain Solutions",
    description: "Developing a blockchain-based supply chain tracking system for real-time inventory management.",
    appliedRole: "Smart Contract Developer",
    applicationDate: "Nov 8, 2026",
    deadline: "Nov 22, 2026",
    budget: "$20,000 - $30,000",
    projectType: "Blockchain",
    skills: ["Solidity", "Web3.js", "React"],
    status: "under_review" as ApplicationStatus,
  },
  {
    id: "4",
    projectTitle: "Social Media Analytics Dashboard",
    organization: "DataViz Labs",
    description: "Creating a comprehensive analytics dashboard for tracking social media metrics across platforms.",
    appliedRole: "Full Stack Developer",
    applicationDate: "Nov 5, 2026",
    deadline: "Nov 20, 2026",
    budget: "$5,000 - $8,000",
    projectType: "Web Development",
    skills: ["Vue.js", "D3.js", "Python", "FastAPI"],
    status: "interview_scheduled" as ApplicationStatus,
  },
  {
    id: "5",
    projectTitle: "IoT Home Automation System",
    organization: "SmartHome Co.",
    description: "Building a home automation system with IoT device integration and mobile app control.",
    appliedRole: "Backend Developer",
    applicationDate: "Nov 1, 2026",
    deadline: "Nov 15, 2026",
    budget: "$10,000 - $15,000",
    projectType: "IoT",
    skills: ["Arduino", "React", "MQTT", "Node.js"],
    status: "rejected" as ApplicationStatus,
  },
];

const pendingInvitations = [
  {
    id: "1",
    teamName: "Alpha Development Team",
    projectName: "Healthcare Patient Portal",
    role: "Frontend Developer",
    message: "We were impressed by your profile and would love to have you join our team.",
  },
  {
    id: "2",
    teamName: "Innovation Squad",
    projectName: "AI Chatbot Development",
    role: "ML Engineer",
    message: "Your expertise in machine learning would be a great addition to our project.",
  },
];

const recommendedProjects = [
  {
    id: "1",
    title: "Financial Trading Platform",
    organization: "FinTech Pro",
    budget: "$12,000 - $18,000",
    skills: ["Python", "React", "PostgreSQL"],
  },
  {
    id: "2",
    title: "Educational LMS System",
    organization: "EduTech Solutions",
    budget: "$8,000 - $12,000",
    skills: ["Next.js", "TypeScript", "MongoDB"],
  },
];

const teamsLookingForMembers = [
  {
    id: "1",
    teamName: "Cloud Architects",
    project: "Cloud Migration Project",
    role: "DevOps Engineer",
    skills: ["AWS", "Docker", "Kubernetes"],
    budget: "$15,000",
  },
  {
    id: "2",
    teamName: "Design Collective",
    project: "Brand Redesign",
    role: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    budget: "$8,000",
  },
];

const upcomingDeadlines = [
  { id: "1", project: "AI-Powered Customer Service Platform", deadline: "Nov 30, 2026", daysLeft: 5 },
  { id: "2", project: "E-commerce Mobile App Redesign", deadline: "Nov 25, 2026", daysLeft: 2 },
  { id: "3", project: "Blockchain Supply Chain Tracker", deadline: "Nov 22, 2026", daysLeft: 1 },
];

const recentActivity = [
  { id: "1", action: "Application submitted for AI-Powered Customer Service Platform", time: "2 hours ago" },
  { id: "2", action: "Interview scheduled for Social Media Analytics Dashboard", time: "1 day ago" },
  { id: "3", action: "Invitation received from Alpha Development Team", time: "2 days ago" },
  { id: "4", action: "Application accepted for E-commerce Mobile App Redesign", time: "3 days ago" },
];

type TabType = "bids" | "team" | "saved" | "archived";
type ApplicationStatus = "pending" | "accepted" | "rejected" | "under_review" | "interview_scheduled";

const statusConfig: Record<ApplicationStatus, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-200" },
  accepted: { label: "Accepted", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "Rejected", color: "bg-rose-50 text-rose-700 border-rose-200" },
  under_review: { label: "Under Review", color: "bg-blue-50 text-blue-700 border-blue-200" },
  interview_scheduled: { label: "Interview Scheduled", color: "bg-violet-50 text-violet-700 border-violet-200" },
};

export default function ApplicationsContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("bids");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAvailable, setIsAvailable] = useState(true);

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "bids", label: "Project Bids", count: 24 },
    { key: "team", label: "Team Connect", count: 5 },
    { key: "saved", label: "Saved Applications", count: 8 },
    { key: "archived", label: "Archived", count: 12 },
  ];

  const getActionButtons = (status: ApplicationStatus) => {
    switch (status) {
      case "pending" as ApplicationStatus:
        return (
          <>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors">
              <Edit size={12} />
              Edit Proposal
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 transition-colors">
              <X size={12} />
              Withdraw
            </button>
          </>
        );
      case "accepted" as ApplicationStatus:
        return (
          <>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-700 transition-colors">
              <Briefcase size={12} />
              Open Project
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors">
              <MessageSquare size={12} />
              Message
            </button>
          </>
        );
      case "under_review" as ApplicationStatus:
        return (
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-semibold text-blue-700 transition-colors">
            <Eye size={12} />
            View Proposal
          </button>
        );
      case "interview_scheduled" as ApplicationStatus:
        return (
          <>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-50 hover:bg-violet-100 border border-violet-200 text-xs font-semibold text-violet-700 transition-colors">
              <Calendar size={12} />
              View Interview
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors">
              <MessageSquare size={12} />
              Message
            </button>
          </>
        );
      case "rejected" as ApplicationStatus:
        return (
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors">
            <Eye size={12} />
            View Feedback
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
            Applications
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Track all your project applications, bids and collaboration requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Filter Bar */}
      <DashboardCard className="p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="under_review">Under Review</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Projects</option>
              <option value="ai">AI/ML</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Application Type</option>
              <option value="bid">Project Bid</option>
              <option value="team">Team Application</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sort by</option>
              <option value="date">Application Date</option>
              <option value="deadline">Deadline</option>
              <option value="status">Status</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Date Range</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            <div className="flex items-center gap-1 border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${
                  viewMode === "grid" ? "bg-blue-50 text-blue-600" : "bg-white text-slate-400 hover:text-slate-600"
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${
                  viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white text-slate-400 hover:text-slate-600"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </DashboardCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#2563EB] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
                <span className="ml-2 opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Application List */}
          {activeTab === "bids" && (
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {applications.map((application) => (
                <DashboardCard key={application.id} className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
                        <Building2 className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-slate-900">{application.projectTitle}</h3>
                        <p className="text-xs text-slate-500">{application.organization}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider shrink-0 ${statusConfig[application.status as ApplicationStatus].color}`}>
                      {statusConfig[application.status as ApplicationStatus].label}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">{application.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <User size={12} className="text-slate-400" />
                      <span className="font-semibold">{application.appliedRole}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar size={12} className="text-slate-400" />
                      <span>Applied: {application.applicationDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock size={12} className="text-slate-400" />
                      <span>Deadline: {application.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <DollarSign size={12} className="text-slate-400" />
                      <span className="font-semibold">{application.budget}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-500">{application.projectType}</span>
                    <div className="flex flex-wrap gap-1">
                      {application.skills.slice(0, 3).map((skill) => (
                        <SkillBadge key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {getActionButtons(application.status)}
                  </div>
                </DashboardCard>
              ))}
            </div>
          )}

          {activeTab === "team" && (
            <DashboardCard className="p-8 text-center">
              <Briefcase className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Team Applications Yet</h3>
              <p className="text-sm text-slate-500 mb-4">
                Start connecting with teams to find collaboration opportunities.
              </p>
              <Link
                href="/dashboard/projects/discover"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors"
              >
                Discover Teams
              </Link>
            </DashboardCard>
          )}

          {activeTab === "saved" && (
            <DashboardCard className="p-8 text-center">
              <Star className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Saved Applications</h3>
              <p className="text-sm text-slate-500 mb-4">
                Save applications to review them later.
              </p>
            </DashboardCard>
          )}

          {activeTab === "archived" && (
            <DashboardCard className="p-8 text-center">
              <Award className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Archived Applications</h3>
              <p className="text-sm text-slate-500 mb-4">
                Archived applications will appear here.
              </p>
            </DashboardCard>
          )}

          {/* Recent Activity */}
          <div>
            <SectionHeading title="Recent Activity" subtitle="Latest updates on your applications" />
            <DashboardCard className="p-5">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">{activity.action}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          {/* Quick Actions */}
          <div>
            <SectionHeading title="Quick Actions" />
            <DashboardCard className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/dashboard/projects/discover"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                    <Search size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Discover Projects</p>
                    <p className="text-xs text-slate-500">Find new opportunities</p>
                  </div>
                  <ChevronRight className="ml-auto text-slate-400 group-hover:text-blue-600 transition-colors" size={16} />
                </Link>
                <Link
                  href="/dashboard/projects/create"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors">
                    <Plus size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Create Project</p>
                    <p className="text-xs text-slate-500">Start a new project</p>
                  </div>
                  <ChevronRight className="ml-auto text-slate-400 group-hover:text-green-600 transition-colors" size={16} />
                </Link>
                <Link
                  href="/dashboard/projects/my-projects"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">My Projects</p>
                    <p className="text-xs text-slate-500">View your projects</p>
                  </div>
                  <ChevronRight className="ml-auto text-slate-400 group-hover:text-purple-600 transition-colors" size={16} />
                </Link>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Profile Availability */}
          <DashboardCard className="p-5 sticky top-6">
            <SectionHeading title="Profile Availability" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Available for Projects</p>
                  <p className="text-xs text-slate-500">Current status</p>
                </div>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className="p-2 rounded-lg transition-colors"
                >
                  {isAvailable ? (
                    <ToggleRight className="text-emerald-500" size={24} />
                  ) : (
                    <ToggleLeft className="text-slate-300" size={24} />
                  )}
                </button>
              </div>
              <div className="p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <User className="text-slate-400" size={16} />
                  <span className="text-sm font-semibold text-slate-900">Current Role</span>
                </div>
                <p className="text-xs text-slate-600">Full Stack Developer</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">Profile Completion</span>
                  <span className="text-sm font-semibold text-emerald-600">85%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Pending Invitations */}
          <DashboardCard className="p-5">
            <SectionHeading title="Pending Invitations" subtitle={`${pendingInvitations.length} new`} />
            <div className="space-y-3">
              {pendingInvitations.map((invitation) => (
                <div key={invitation.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{invitation.teamName}</h4>
                      <p className="text-xs text-slate-500">{invitation.projectName}</p>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold uppercase">
                      New
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 line-clamp-2">{invitation.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">{invitation.role}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors">
                        Accept
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Recommended Projects */}
          <DashboardCard className="p-5">
            <SectionHeading title="Recommended Projects" />
            <div className="space-y-3">
              {recommendedProjects.map((project) => (
                <div key={project.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{project.title}</h4>
                  <p className="text-xs text-slate-500 mb-2">{project.organization}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">{project.budget}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.skills.slice(0, 2).map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                  <button className="w-full px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors">
                    Quick Apply
                  </button>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Teams Looking For Members */}
          <DashboardCard className="p-5">
            <SectionHeading title="Teams Looking For Members" />
            <div className="space-y-3">
              {teamsLookingForMembers.map((team) => (
                <div key={team.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{team.teamName}</h4>
                  <p className="text-xs text-slate-500 mb-2">{team.project}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">{team.role}</span>
                    <span className="text-xs font-semibold text-slate-700">{team.budget}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {team.skills.slice(0, 2).map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                  <button className="w-full px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold transition-colors">
                    Join Team
                  </button>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Upcoming Deadlines */}
          <DashboardCard className="p-5">
            <SectionHeading title="Upcoming Deadlines" />
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    deadline.daysLeft <= 2 ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
                  }`}>
                    <AlertCircle size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{deadline.project}</p>
                    <p className="text-xs text-slate-500">{deadline.deadline}</p>
                  </div>
                  <span className={`text-xs font-bold ${
                    deadline.daysLeft <= 2 ? "text-rose-600" : "text-amber-600"
                  }`}>
                    {deadline.daysLeft}d left
                  </span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
