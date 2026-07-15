"use client";

import { useState } from "react";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import SectionHeading from "@/components/dashboard/projects/SectionHeading";
import SkillBadge from "@/components/dashboard/projects/SkillBadge";
import { 
  Save, 
  Eye, 
  Send, 
  Upload, 
  Plus, 
  X, 
  Check, 
  Calendar, 
  Clock, 
  DollarSign,
  Users,
  MapPin,
  FileText,
  Video,
  Globe,
  Link,
  Lightbulb,
  HelpCircle,
  BookOpen,
  MessageSquare,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function CreateProjectContent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "",
    organization: "",
    shortDescription: "",
    detailedDescription: "",
    teamSize: "",
    experienceLevel: "",
    duration: "",
    workMode: "",
    budget: "",
    currency: "USD",
    applicationDeadline: "",
    startDate: "",
    endDate: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [deliverables, setDeliverables] = useState([
    { id: "1", name: "Source Code", checked: true },
    { id: "2", name: "Documentation", checked: true },
    { id: "3", name: "Presentation", checked: false },
    { id: "4", name: "Demo Video", checked: false },
    { id: "5", name: "Deployment", checked: true },
    { id: "6", name: "Testing Report", checked: false },
  ]);
  const [customDeliverable, setCustomDeliverable] = useState("");

  const workflowSteps = [
    { id: 1, label: "Project Published", status: "completed" },
    { id: 2, label: "Applications Open", status: "completed" },
    { id: 3, label: "Team Selection", status: "current" },
    { id: 4, label: "Development", status: "pending" },
    { id: 5, label: "Submission", status: "pending" },
    { id: 6, label: "Review", status: "pending" },
    { id: 7, label: "Completion", status: "pending" },
  ];

  const roles = [
    { id: "1", name: "Frontend Developer", count: 2 },
    { id: "2", name: "Backend Developer", count: 1 },
    { id: "3", name: "UI/UX Designer", count: 1 },
  ];

  const handleAddSkill = () => {
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      setSelectedSkills([...selectedSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleAddDeliverable = () => {
    if (customDeliverable.trim()) {
      setDeliverables([
        ...deliverables,
        { id: Date.now().toString(), name: customDeliverable.trim(), checked: true },
      ]);
      setCustomDeliverable("");
    }
  };

  const handleDeliverableToggle = (id: string) => {
    setDeliverables(
      deliverables.map((d) => (d.id === id ? { ...d, checked: !d.checked } : d))
    );
  };

  const handleRemoveDeliverable = (id: string) => {
    setDeliverables(deliverables.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
            Create Project
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-1">
            Create and publish a new project for contributors.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors">
            <Save size={16} />
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors">
            <Eye size={16} />
            Preview
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors">
            <Send size={16} />
            Publish Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Basic Information */}
          <DashboardCard className="p-6">
            <SectionHeading title="Basic Information" />
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="ai">AI/ML</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Difficulty *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  placeholder="Brief project summary (max 150 characters)"
                  maxLength={150}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-400 mt-1">{formData.shortDescription.length}/150</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  placeholder="Provide a detailed description of the project..."
                  rows={6}
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Banner / Image
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-300 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-slate-400 mb-3" size={32} />
                  <p className="text-sm text-slate-600 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-400">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Reference Links
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Link size={16} className="text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Section 2: Required Skills */}
          <DashboardCard className="p-6">
            <SectionHeading title="Required Skills" />
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search or add skills..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddSkill}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    variant="removable"
                    onRemove={() => handleRemoveSkill(skill)}
                  />
                ))}
                {selectedSkills.length === 0 && (
                  <p className="text-sm text-slate-400">No skills selected yet</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {["React", "Python", "TypeScript", "Node.js", "AWS", "Docker"].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => !selectedSkills.includes(skill) && setSelectedSkills([...selectedSkills, skill])}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedSkills.includes(skill)
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </DashboardCard>

          {/* Section 3: Team Requirements */}
          <DashboardCard className="p-6">
            <SectionHeading title="Team Requirements" />
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Team Size *
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select team size</option>
                    <option value="1-2">1-2 members</option>
                    <option value="3-4">3-4 members</option>
                    <option value="5-7">5-7 members</option>
                    <option value="8+">8+ members</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Experience Level *
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="mid">Mid-level (2-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Duration *
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select duration</option>
                    <option value="1-2">1-2 months</option>
                    <option value="2-3">2-3 months</option>
                    <option value="3-4">3-4 months</option>
                    <option value="4-6">4-6 months</option>
                    <option value="6+">6+ months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Work Mode *
                  </label>
                  <select
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select work mode</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Roles Required
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-900">{role.name}</span>
                        <span className="text-xs text-slate-500">x{role.count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Users size={12} />
                        <span>Open positions</span>
                      </div>
                    </div>
                  ))}
                  <button className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600">
                    <Plus size={16} />
                    Add Role
                  </button>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Section 4: Deliverables */}
          <DashboardCard className="p-6">
            <SectionHeading title="Deliverables" />
            <div className="space-y-3">
              {deliverables.map((deliverable) => (
                <div
                  key={deliverable.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDeliverableToggle(deliverable.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        deliverable.checked
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-slate-300 hover:border-blue-400"
                      }`}
                    >
                      {deliverable.checked && <Check size={12} />}
                    </button>
                    <span className={`text-sm ${deliverable.checked ? "text-slate-900" : "text-slate-500"}`}>
                      {deliverable.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveDeliverable(deliverable.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom deliverable..."
                  value={customDeliverable}
                  onChange={(e) => setCustomDeliverable(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddDeliverable()}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddDeliverable}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
            </div>
          </DashboardCard>

          {/* Section 5: Budget & Timeline */}
          <DashboardCard className="p-6">
            <SectionHeading title="Budget & Timeline" />
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Budget *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="5,000 - 10,000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Currency *
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Application Deadline *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="date"
                      value={formData.applicationDeadline}
                      onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project End Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Section 6: Project Workflow */}
          <DashboardCard className="p-6">
            <SectionHeading title="Project Workflow" subtitle="Timeline of project stages" />
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 min-w-max">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        step.status === "completed"
                          ? "bg-emerald-500 text-white"
                          : step.status === "current"
                          ? "bg-blue-500 text-white ring-4 ring-blue-100"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {step.status === "completed" ? <Check size={16} /> : step.id}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        step.status === "completed"
                          ? "text-emerald-600"
                          : step.status === "current"
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        step.status === "completed" ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Bottom Information Banner */}
          <DashboardCard className="p-6 bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <Lightbulb size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Review Before Publishing
                </h3>
                <p className="text-sm text-slate-600">
                  Please review all project details carefully before publishing. Once published, 
                  your project will be visible to all contributors and applications will start coming in.
                </p>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Live Project Preview */}
          <DashboardCard className="p-5 sticky top-6">
            <SectionHeading title="Live Preview" />
            <div className="space-y-4">
              <div className="h-32 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                <span className="text-white/80 text-sm">Project Banner</span>
              </div>
              
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {formData.title || "Project Title"}
                </h3>
                <p className="text-xs text-slate-500">
                  {formData.category || "Category"} • {formData.difficulty || "Difficulty"}
                </p>
              </div>

              <p className="text-sm text-slate-600 line-clamp-3">
                {formData.shortDescription || "Project description will appear here..."}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Budget</span>
                  <span className="font-semibold text-slate-700">
                    {formData.budget ? `${formData.currency} ${formData.budget}` : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-semibold text-slate-700">{formData.duration || "-"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Team Size</span>
                  <span className="font-semibold text-slate-700">{formData.teamSize || "-"}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-1">
                  {selectedSkills.length > 0 ? (
                    selectedSkills.slice(0, 4).map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">No skills selected</span>
                  )}
                  {selectedSkills.length > 4 && (
                    <span className="text-xs text-slate-500">+{selectedSkills.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Tips Card */}
          <DashboardCard className="p-5">
            <SectionHeading title="Tips" />
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-slate-600">
                  Be specific about project requirements to attract the right contributors.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-slate-600">
                  Set realistic deadlines based on project complexity and team size.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-slate-600">
                  Include all required skills to ensure applicants have the necessary expertise.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-slate-600">
                  Provide clear deliverables to set expectations for project outcomes.
                </p>
              </div>
            </div>
          </DashboardCard>

          {/* Need Help */}
          <DashboardCard className="p-5">
            <SectionHeading title="Need Help?" />
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                <BookOpen className="text-slate-400" size={18} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Guide</p>
                  <p className="text-xs text-slate-500">Step-by-step instructions</p>
                </div>
                <ChevronRight className="ml-auto text-slate-400" size={16} />
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                <FileText className="text-slate-400" size={18} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Documentation</p>
                  <p className="text-xs text-slate-500">Detailed documentation</p>
                </div>
                <ChevronRight className="ml-auto text-slate-400" size={16} />
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                <MessageSquare className="text-slate-400" size={18} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Contact Support</p>
                  <p className="text-xs text-slate-500">Get help from our team</p>
                </div>
                <ChevronRight className="ml-auto text-slate-400" size={16} />
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
