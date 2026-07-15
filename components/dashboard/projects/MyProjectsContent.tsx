"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import StatsCard from "@/components/dashboard/projects/StatsCard";
import SectionHeading from "@/components/dashboard/projects/SectionHeading";
import SkillBadge from "@/components/dashboard/projects/SkillBadge";
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  Plus, 
  Search, 
  Filter, 
  Grid3x3, 
  List, 
  Calendar, 
  Users, 
  Star, 
  Award,
  ArrowRight,
  AlertCircle,
  Zap,
  FileText,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";

// Mock data
const statsData = [
  { title: "Active Projects", value: "12", icon: Briefcase, trend: "+2 this month", color: "blue" as const },
  { title: "Pending Projects", value: "3", icon: Clock, trend: "1 awaiting review", color: "orange" as const },
  { title: "Completed Projects", value: "28", icon: CheckCircle, trend: "+5 this month", color: "green" as const },
  { title: "Created By Me", value: "8", icon: Award, trend: "+1 this week", color: "purple" as const },
];

const activeProjects = [
  {
    id: "1",
    title: "AI-Powered Customer Service Platform",
    organization: "TechCorp Inc.",
    description: "Building an intelligent customer service platform using NLP and ML to automate support tickets.",
    role: "Lead Developer",
    milestone: "Phase 2: Model Training",
    progress: 65,
    deadline: "Dec 15, 2026",
    team: ["SC", "AR", "JK", "MB"],
    techStack: ["Python", "TensorFlow", "React", "Node.js"],
    gradient: "from-blue-500 to-violet-500",
  },
  {
    id: "2",
    title: "E-commerce Mobile App Redesign",
    organization: "RetailMax",
    description: "Redesigning the mobile shopping experience with focus on UX/UI improvements and performance.",
    role: "UI/UX Designer",
    milestone: "Design System Finalization",
    progress: 80,
    deadline: "Nov 30, 2026",
    team: ["SC", "AR"],
    techStack: ["React Native", "TypeScript", "Figma"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "3",
    title: "Blockchain Supply Chain Tracker",
    organization: "LogiChain Solutions",
    description: "Developing a blockchain-based supply chain tracking system for real-time inventory management.",
    role: "Smart Contract Developer",
    milestone: "Smart Contract Deployment",
    progress: 45,
    deadline: "Jan 20, 2027",
    team: ["JK", "MB", "RH"],
    techStack: ["Solidity", "Web3.js", "React"],
    gradient: "from-orange-500 to-red-500",
  },
];

const pendingProjects = [
  {
    id: "4",
    title: "Social Media Analytics Dashboard",
    organization: "DataViz Labs",
    status: "Awaiting Approval",
    expectedStart: "Dec 1, 2026",
  },
  {
    id: "5",
    title: "IoT Home Automation System",
    organization: "SmartHome Co.",
    status: "Team Formation",
    expectedStart: "Dec 5, 2026",
  },
];

const completedProjects = [
  {
    id: "6",
    title: "Financial Trading Platform",
    organization: "FinTech Pro",
    completionDate: "Oct 15, 2026",
    rating: 4.8,
    hasCertificate: true,
  },
  {
    id: "7",
    title: "Educational LMS System",
    organization: "EduTech Solutions",
    completionDate: "Sep 28, 2026",
    rating: 4.5,
    hasCertificate: true,
  },
];

const createdByMe = [
  {
    id: "8",
    title: "Healthcare Patient Portal",
    budget: "$12,000 - $18,000",
    applicants: 15,
    team: ["SC", "AR", "JK"],
    status: "Reviewing Applications",
  },
  {
    id: "9",
    title: "Real Estate Property Management",
    budget: "$8,000 - $12,000",
    applicants: 8,
    team: ["MB", "RH"],
    status: "Active Development",
  },
];

const recentActivity = [
  { id: "1", action: "You completed milestone 'Phase 1' in AI-Powered Customer Service Platform", time: "2 hours ago" },
  { id: "2", action: "New team member joined Blockchain Supply Chain Tracker", time: "5 hours ago" },
  { id: "3", action: "Your application for Social Media Analytics Dashboard was approved", time: "1 day ago" },
  { id: "4", action: "Project deadline updated for E-commerce Mobile App Redesign", time: "2 days ago" },
];

const needAttention = [
  {
    id: "1",
    title: "Submit weekly progress report",
    project: "AI-Powered Customer Service Platform",
    urgency: "high",
  },
  {
    id: "2",
    title: "Review team member application",
    project: "Blockchain Supply Chain Tracker",
    urgency: "medium",
  },
];

type TabType = "active" | "pending" | "completed" | "created";

export default function MyProjectsContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "active", label: "Active", count: 12 },
    { key: "pending", label: "Pending", count: 3 },
    { key: "completed", label: "Completed", count: 28 },
    { key: "created", label: "Created By Me", count: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
            My Projects
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Manage all projects you've joined or created.
          </p>
        </div>
        <Link
          href="/dashboard/projects/create"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-colors"
        >
          <Plus size={18} />
          Create Project
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Filter Section */}
      <DashboardCard className="p-5">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
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

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="ai">AI/ML</option>
              <option value="blockchain">Blockchain</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Roles</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Project Manager</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sort by</option>
              <option value="deadline">Deadline</option>
              <option value="progress">Progress</option>
              <option value="name">Name</option>
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

      {/* Active Projects */}
      {activeTab === "active" && (
        <div>
          <SectionHeading title="Active Projects" subtitle="Projects you're currently working on" />
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {activeProjects.map((project) => (
              <DashboardCard key={project.id} className="overflow-hidden">
                <div className={`h-32 bg-gradient-to-r ${project.gradient} relative`}>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{project.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{project.organization}</p>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">{project.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Your Role: <span className="font-semibold text-slate-700">{project.role}</span></span>
                      <span className="text-slate-500">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Milestone: <span className="font-semibold text-slate-700">{project.milestone}</span></span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar size={12} />
                        {project.deadline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex -space-x-2">
                      {project.team.map((member, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <SkillBadge key={tech} skill={tech} />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors">
                      Open Workspace
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      )}

      {/* Pending Projects */}
      {activeTab === "pending" && (
        <div>
          <SectionHeading title="Pending Projects" subtitle="Projects awaiting your action or approval" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingProjects.map((project) => (
              <DashboardCard key={project.id} className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                    <p className="text-xs text-slate-500">{project.organization}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Status</span>
                    <span className="px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold">
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Expected Start</span>
                    <span className="font-semibold text-slate-700">{project.expectedStart}</span>
                  </div>
                </div>

                <button className="w-full px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors">
                  View Details
                </button>
              </DashboardCard>
            ))}
          </div>
        </div>
      )}

      {/* Completed Projects */}
      {activeTab === "completed" && (
        <div>
          <SectionHeading title="Completed Projects" subtitle="Projects you've successfully completed" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedProjects.map((project) => (
              <DashboardCard key={project.id} className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                    <p className="text-xs text-slate-500">{project.organization}</p>
                  </div>
                  {project.hasCertificate && (
                    <Award className="text-amber-500" size={20} />
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Completed</span>
                    <span className="font-semibold text-slate-700">{project.completionDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-400 fill-amber-400" size={14} />
                      <span className="font-semibold text-slate-700">{project.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors">
                    View Evaluation
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors">
                    Open Workspace
                  </button>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      )}

      {/* Created By Me */}
      {activeTab === "created" && (
        <div>
          <SectionHeading title="Created By Me" subtitle="Projects you've created and are managing" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {createdByMe.map((project) => (
              <DashboardCard key={project.id} className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                    <Briefcase className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                    <p className="text-xs text-slate-500">{project.budget}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Applicants</span>
                    <span className="font-semibold text-slate-700">{project.applicants}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">Team:</span>
                    <div className="flex -space-x-1">
                      {project.team.map((member, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Status</span>
                    <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors">
                    Manage Project
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors">
                    View Applications
                  </button>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <SectionHeading title="Recent Activity" subtitle="Latest updates across your projects" />
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

        {/* Need Your Attention */}
        <div>
          <SectionHeading title="Need Your Attention" subtitle="Pending actions required" />
          <DashboardCard className="p-5">
            <div className="space-y-3">
              {needAttention.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border ${
                    item.urgency === "high"
                      ? "border-rose-200 bg-rose-50"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle
                      size={16}
                      className={item.urgency === "high" ? "text-rose-500 shrink-0 mt-0.5" : "text-amber-500 shrink-0 mt-0.5"}
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <SectionHeading title="Quick Actions" />
        <DashboardCard className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <ArrowRight className="ml-auto text-slate-400 group-hover:text-blue-600 transition-colors" size={16} />
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
              <ArrowRight className="ml-auto text-slate-400 group-hover:text-green-600 transition-colors" size={16} />
            </Link>
            <Link
              href="/dashboard/projects/applications"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Applications</p>
                <p className="text-xs text-slate-500">View your applications</p>
              </div>
              <ArrowRight className="ml-auto text-slate-400 group-hover:text-purple-600 transition-colors" size={16} />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all group"
            >
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors">
                <LayoutGrid size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Dashboard</p>
                <p className="text-xs text-slate-500">View overview</p>
              </div>
              <ArrowRight className="ml-auto text-slate-400 group-hover:text-amber-600 transition-colors" size={16} />
            </Link>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
