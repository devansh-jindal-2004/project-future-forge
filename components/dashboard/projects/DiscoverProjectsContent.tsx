"use client";

import { useState } from "react";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import StatsCard from "@/components/dashboard/projects/StatsCard";
import ProjectListCard, { ProjectListData } from "@/components/dashboard/projects/ProjectListCard";
import SectionHeading from "@/components/dashboard/projects/SectionHeading";
import SkillBadge from "@/components/dashboard/projects/SkillBadge";
import BidCard, { BidData } from "@/components/dashboard/projects/BidCard";
import { Search, Filter, Briefcase, Users, Building, Award, TrendingUp, UserPlus, Clock, ChevronDown, Star } from "lucide-react";

// Mock data
const statsData = [
  { title: "Open Projects", value: "1,234", icon: Briefcase, trend: "+12% this week", color: "blue" as const },
  { title: "Active Bidders", value: "856", icon: Users, trend: "+8% this week", color: "green" as const },
  { title: "Organizations", value: "234", icon: Building, trend: "+5% this week", color: "purple" as const },
  { title: "Projects Awarded", value: "567", icon: Award, trend: "+15% this week", color: "orange" as const },
];

const featuredProjects: ProjectListData[] = [
  {
    id: "1",
    title: "AI-Powered Customer Service Platform",
    company: "TechCorp Inc.",
    description: "Build an intelligent customer service platform using natural language processing and machine learning to automate support tickets.",
    skills: ["Python", "TensorFlow", "React", "Node.js"],
    budget: "$15,000 - $25,000",
    duration: "3-4 months",
    teamSize: "4-6 members",
    difficulty: "Advanced",
    status: "active",
  },
  {
    id: "2",
    title: "E-commerce Mobile App Redesign",
    company: "RetailMax",
    description: "Redesign and rebuild the mobile shopping experience with focus on UX/UI improvements and performance optimization.",
    skills: ["React Native", "TypeScript", "Figma", "Redux"],
    budget: "$8,000 - $12,000",
    duration: "2-3 months",
    teamSize: "3-4 members",
    difficulty: "Intermediate",
    status: "active",
  },
  {
    id: "3",
    title: "Blockchain Supply Chain Tracker",
    company: "LogiChain Solutions",
    description: "Develop a blockchain-based supply chain tracking system for real-time inventory management and transparency.",
    skills: ["Solidity", "Web3.js", "React", "PostgreSQL"],
    budget: "$20,000 - $30,000",
    duration: "4-6 months",
    teamSize: "5-7 members",
    difficulty: "Advanced",
    status: "active",
  },
];

const recommendedProjects: ProjectListData[] = [
  {
    id: "4",
    title: "Social Media Analytics Dashboard",
    company: "DataViz Labs",
    description: "Create a comprehensive analytics dashboard for tracking social media metrics across multiple platforms.",
    skills: ["Vue.js", "D3.js", "Python", "FastAPI"],
    budget: "$5,000 - $8,000",
    duration: "1-2 months",
    teamSize: "2-3 members",
    difficulty: "Beginner",
    status: "active",
  },
  {
    id: "5",
    title: "IoT Home Automation System",
    company: "SmartHome Co.",
    description: "Build a home automation system with IoT device integration and mobile app control interface.",
    skills: ["Arduino", "React", "MQTT", "Node.js"],
    budget: "$10,000 - $15,000",
    duration: "2-3 months",
    teamSize: "3-4 members",
    difficulty: "Intermediate",
    status: "active",
  },
  {
    id: "6",
    title: "Healthcare Patient Portal",
    company: "MedTech Solutions",
    description: "Develop a secure patient portal for appointment scheduling, medical records access, and telemedicine features.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    budget: "$12,000 - $18,000",
    duration: "3-4 months",
    teamSize: "4-5 members",
    difficulty: "Intermediate",
    status: "active",
  },
  {
    id: "7",
    title: "Real Estate Property Management",
    company: "PropTech Inc.",
    description: "Create a property management system with tenant portals, maintenance tracking, and financial reporting.",
    skills: ["Angular", "Spring Boot", "MySQL", "Docker"],
    budget: "$8,000 - $12,000",
    duration: "2-3 months",
    teamSize: "3-4 members",
    difficulty: "Intermediate",
    status: "active",
  },
];

const openProjects: BidData[] = [
  {
    id: "8",
    projectTitle: "Machine Learning Model Optimization",
    company: "AI Dynamics",
    description: "Optimize existing ML models for better performance and reduced latency in production environment.",
    status: "pending",
    bidAmount: "$12,500",
    estTime: "6 weeks",
    submittedDate: "2 days ago",
  },
  {
    id: "9",
    projectTitle: "Cloud Infrastructure Migration",
    company: "CloudFirst Corp",
    description: "Migrate on-premise infrastructure to AWS with minimal downtime and improved scalability.",
    status: "pending",
    bidAmount: "$18,000",
    estTime: "8 weeks",
    submittedDate: "1 day ago",
  },
  {
    id: "10",
    projectTitle: "Mobile Payment Integration",
    company: "PayFlow Systems",
    description: "Integrate multiple payment gateways into existing mobile application with enhanced security features.",
    status: "pending",
    bidAmount: "$9,500",
    estTime: "4 weeks",
    submittedDate: "3 days ago",
  },
];

const trendingSkills = ["React", "Python", "TypeScript", "AWS", "Node.js", "Docker", "Machine Learning", "GraphQL"];

const availableTeamMembers = [
  { name: "Sarah Chen", role: "Full Stack Developer", skills: ["React", "Node.js", "PostgreSQL"], availability: "Immediate" },
  { name: "Alex Rivera", role: "UI/UX Designer", skills: ["Figma", "Adobe XD", "Prototyping"], availability: "1 week" },
  { name: "Jordan Kim", role: "Backend Developer", skills: ["Python", "Django", "Redis"], availability: "Immediate" },
];

const teamsLookingForMembers = [
  { name: "Team Alpha", project: "E-commerce Platform", lookingFor: ["Frontend Developer", "DevOps Engineer"] },
  { name: "Innovation Squad", project: "AI Chatbot", lookingFor: ["ML Engineer", "Data Scientist"] },
];

const recentlyViewed = [
  { id: "11", title: "Financial Trading Platform", company: "FinTech Pro" },
  { id: "12", title: "Educational LMS System", company: "EduTech Solutions" },
];

export default function DiscoverProjectsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    difficulty: "",
    budget: "",
    skills: [] as string[],
    status: "",
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <DashboardCard className="p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search projects, skills, or organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Category</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="ai">AI/ML</option>
              <option value="blockchain">Blockchain</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Budget</option>
              <option value="low">$0 - $5,000</option>
              <option value="medium">$5,000 - $15,000</option>
              <option value="high">$15,000+</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Skills</option>
              <option value="react">React</option>
              <option value="python">Python</option>
              <option value="nodejs">Node.js</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              More Filters
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </DashboardCard>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Featured Projects */}
      <div>
        <SectionHeading title="Featured Projects" subtitle="Top projects handpicked for you" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <ProjectListCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Recommended For You */}
      <div>
        <SectionHeading title="Recommended For You" subtitle="Based on your skills and interests" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedProjects.map((project) => (
            <ProjectListCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* All Open Projects */}
      <div>
        <SectionHeading 
          title="All Open Projects" 
          subtitle="Browse all available projects"
          action={
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View All
            </button>
          }
        />
        <DashboardCard className="p-5">
          <div className="space-y-4">
            {openProjects.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Ways to Participate */}
      <div>
        <SectionHeading title="Ways to Participate" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DashboardCard className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Individual Contributor</h3>
                <p className="text-sm text-slate-600">Work independently on projects that match your skills and availability.</p>
              </div>
            </div>
          </DashboardCard>
          <DashboardCard className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Team Member</h3>
                <p className="text-sm text-slate-600">Join existing teams or form new ones to collaborate on larger projects.</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Available Team Members */}
      <div>
        <SectionHeading title="Available Team Members" subtitle="Find collaborators for your projects" />
        <DashboardCard className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableTeamMembers.map((member, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {member.skills.slice(0, 2).map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
                <p className="text-xs text-emerald-600 font-semibold">Available: {member.availability}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Trending Skills */}
      <div>
        <SectionHeading title="Trending Skills" subtitle="Most in-demand skills this month" />
        <DashboardCard className="p-5">
          <div className="flex flex-wrap gap-2">
            {trendingSkills.map((skill) => (
              <div key={skill} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100">
                <TrendingUp size={14} className="text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">{skill}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Teams Looking for Members */}
      <div>
        <SectionHeading title="Teams Looking for Members" />
        <DashboardCard className="p-5">
          <div className="space-y-3">
            {teamsLookingForMembers.map((team, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{team.name}</h4>
                  <p className="text-xs text-slate-500">{team.project}</p>
                </div>
                <div className="flex items-center gap-2">
                  <UserPlus size={16} className="text-slate-400" />
                  <span className="text-xs font-semibold text-slate-600">
                    {team.lookingFor.join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Recently Viewed */}
      <div>
        <SectionHeading title="Recently Viewed" />
        <DashboardCard className="p-5">
          <div className="space-y-2">
            {recentlyViewed.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-slate-400" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.company}</p>
                  </div>
                </div>
                <Star size={16} className="text-slate-300 hover:text-yellow-400 transition-colors cursor-pointer" />
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
