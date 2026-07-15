"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, BookOpen, Map, ClipboardList, Award,
    FolderKanban, Bot, GraduationCap, Briefcase, Globe,
    FileText, Bookmark, Settings, ChevronDown, ChevronRight,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import ProgressBar from "@/components/dashboard/shared/ProgressBar";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

/* ─── Icon Map ──────────────────────────────────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard, BookOpen, Map, ClipboardList, Award,
    FolderKanban, Bot, GraduationCap, Briefcase, Globe,
    FileText, Bookmark, Settings,
};

/* ─── Nav Config (Phase 1) ──────────────────────────────────────────────────── */
const navGroups = [
    {
        id: "main",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
        ],
    },
    {
        id: "learning",
        label: "My Learning",
        collapsible: true,
        defaultOpen: true,
        items: [
            { label: "My Courses", href: "/dashboard/courses", icon: "BookOpen" },
            { label: "Roadmaps", href: "/dashboard/roadmaps", icon: "Map" },
            { label: "Assessments", href: "/dashboard/assessments", icon: "ClipboardList" },
            { label: "Certificates", href: "/dashboard/certificates", icon: "Award" },
        ],
    },
    {
        id: "projects",
        items: [
            {
                label: "Projects",
                href: "/dashboard/projects/discover",
                icon: "FolderKanban",
                subItems: [
                    { label: "Discover Projects", href: "/dashboard/projects/discover" },
                    { label: "My Projects", href: "/dashboard/projects/my-projects" },
                    { label: "Create Project", href: "/dashboard/projects/create" },
                    { label: "Applications", href: "/dashboard/projects/applications" },
                ],
            },
            { label: "AI Mentor", href: "/dashboard/ai-mentor", icon: "Bot" },
            { label: "Opportunities", href: "/dashboard/opportunities", icon: "Briefcase" },
            { label: "Community", href: "/dashboard/community", icon: "Globe" },
        ],
    },
    {
        id: "mentorship",
        label: "Mentorship",
        collapsible: true,
        defaultOpen: false,
        items: [
            { label: "Overview", href: "/mentorship/overview", icon: "GraduationCap" },
            { label: "Available Projects", href: "/mentorship/available-projects", icon: "FolderKanban" },
            { label: "My Mentorships", href: "/mentorship/my-mentorships", icon: "Award" },
            { label: "Invitations", href: "/mentorship/invitations", icon: "Bookmark" },
        ],
    },
    {
        id: "secondary",
        items: [
            { label: "Portfolio", href: "/dashboard/portfolio", icon: "FileText" },
            { label: "Bookmarks", href: "/dashboard/bookmarks", icon: "Bookmark" },
        ],
    },
];

/* ─── Logo ──────────────────────────────────────────────────────────────────── */
function SidebarLogo({ isCollapsed }: { isCollapsed: boolean }) {
    return (
        <Link href="/" className={`flex items-center py-5 shrink-0 transition-all ${isCollapsed ? "justify-center px-0" : "gap-2.5 px-5"}`}>
            <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
                <defs>
                    <linearGradient id="goldGradSidebar" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#D9A441" /><stop offset="1" stopColor="#B8791A" />
                    </linearGradient>
                </defs>
                <path d="M8 6h4v28H8V6z" fill="url(#goldGradSidebar)" />
                <path d="M8 6h18a6 6 0 012 4.5c0 3-2.5 5.5-5.5 5.5H8V6z" fill="url(#goldGradSidebar)" />
                <path d="M8 20h14a5 5 0 011.5 3.8c0 2.5-2 4.7-4.5 4.7H8V20z" fill="url(#goldGradSidebar)" />
            </svg>
            {!isCollapsed && (
                <span className="text-base font-extrabold tracking-tight leading-none">
                    <span className="text-white">FUTURE</span>
                    <span className="bg-gradient-to-r from-[#D9A441] to-[#B8791A] bg-clip-text text-transparent">FORGE</span>
                </span>
            )}
        </Link>
    );
}

/* ─── Nav Item ──────────────────────────────────────────────────────────────── */
interface SubItem {
    label: string;
    href: string;
}

function NavItem({ label, href, icon, isCollapsed, subItems }: {
    label: string; href: string; icon: string; isCollapsed: boolean; subItems?: SubItem[];
}) {
    const pathname = usePathname();
    const isSubActive = subItems?.some((sub) => pathname === sub.href || (sub.href !== "/dashboard" && pathname.startsWith(sub.href)));
    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href)) || !!isSubActive;
    const Icon = iconMap[icon] ?? LayoutDashboard;

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isActive) {
            setIsOpen(true);
        }
    }, [isActive]);

    return (
        <div className="flex flex-col w-full">
            <Link
                href={href}
                onClick={() => {
                    if (subItems && !isCollapsed) {
                        setIsOpen(!isOpen);
                    }
                }}
                className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                    isActive
                        ? "bg-[rgba(192,138,30,0.18)] text-[#D9A441]"
                        : "text-white/60 hover:bg-white/8 hover:text-white"
                } ${isCollapsed ? "justify-center px-0 mx-2" : "px-4 mx-0"}`}
            >
                <Icon size={18} className={`shrink-0 ${isActive ? "text-[#D9A441]" : "text-white/50 group-hover:text-white"}`} />
                {!isCollapsed && <span className="truncate">{label}</span>}
                {!isCollapsed && subItems && (
                    <span className="ml-auto text-white/40 group-hover:text-white transition-colors">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                )}
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#D9A441] rounded-r-full" />}
                
                {/* Custom Hover Tooltip for collapsed state */}
                {isCollapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#101B33] text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border border-white/10 shadow-lg pointer-events-none">
                        {label}
                    </div>
                )}
            </Link>

            {/* Sub-items list */}
            {!isCollapsed && subItems && isOpen && (
                <div className="mt-1 ml-6 pl-3 border-l border-white/10 space-y-1">
                    {subItems.map((subItem) => {
                        const isSubLinkActive = pathname === subItem.href || (subItem.href !== "/dashboard" && pathname.startsWith(subItem.href));
                        return (
                            <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`block py-1.5 text-xs font-medium transition-all ${
                                    isSubLinkActive
                                        ? "text-[#D9A441] font-semibold"
                                        : "text-white/50 hover:text-white"
                                }`}
                            >
                                {subItem.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}


/* ─── Nav Group ─────────────────────────────────────────────────────────────── */
function NavGroup({ group, isCollapsed }: { group: typeof navGroups[0]; isCollapsed: boolean }) {
    const [isOpen, setIsOpen] = useState((group as { defaultOpen?: boolean }).defaultOpen ?? true);
    const hasLabel = "label" in group && group.label;
    const isCollapsible = "collapsible" in group && group.collapsible;

    return (
        <div className="mb-1">
            {hasLabel && !isCollapsed && (
                <button
                    onClick={() => isCollapsible && setIsOpen((v) => !v)}
                    className={`w-full flex items-center justify-between px-4 py-1.5 mb-0.5 ${isCollapsible ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C08A1E] rounded-md" : "cursor-default"}`}
                    aria-expanded={isCollapsible ? isOpen : undefined}
                    aria-label={isCollapsible ? `Toggle ${(group as { label: string }).label} group` : undefined}
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                        {(group as { label: string }).label}
                    </span>
                    {isCollapsible && (
                        isOpen
                            ? <ChevronDown size={12} className="text-white/30" />
                            : <ChevronRight size={12} className="text-white/30" />
                    )}
                </button>
            )}
            {(!isCollapsible || isOpen || isCollapsed) && (
                <div className={`space-y-0.5 ${isCollapsed ? "px-0" : "px-2"}`}>
                    {group.items.map((item) => (
                        <NavItem key={item.href} {...item} isCollapsed={isCollapsed} />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─── User Card ─────────────────────────────────────────────────────────────── */
function UserCard({ isCollapsed }: { isCollapsed: boolean }) {
    const { currentUser, logout } = useAuth();
    
    // Safely fallback if currentUser is somehow missing
    const name = currentUser?.fullName || "User";
    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    
    const xp = currentUser?.xp || 0;
    const level = Math.floor(xp / 1000) + 1;
    const xpToNextLevel = 1000 - (xp % 1000);
    const xpPercent = Math.round(((xp % 1000) / 1000) * 100);

    return (
        <div className={`mt-auto border-t border-white/10 pt-3 pb-4 ${isCollapsed ? "px-2" : "px-3"}`}>
            <div className={`flex items-center gap-3 py-2 rounded-xl group ${isCollapsed ? "justify-center px-0" : "px-2"}`}>
                <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[#D9A441] to-[#B8791A] flex items-center justify-center text-white font-black text-sm shadow-md">
                    {initials}
                </div>
                {!isCollapsed && (
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white truncate">{name}</p>
                        <p className="text-[10px] text-white/40 truncate">Level {level} · {currentUser?.role || "Student"}</p>
                    </div>
                )}
                {!isCollapsed && (
                    <button 
                        onClick={logout}
                        className="text-white/40 hover:text-red-400 p-1 rounded transition-colors"
                        title="Logout"
                    >
                        <LogOut size={16} />
                    </button>
                )}
            </div>
            {!isCollapsed && (
                <div className="mt-2 px-2">
                    <ProgressBar
                        value={xpPercent}
                        label={`${xp.toLocaleString()} XP`}
                        showPercent={false}
                        height="slim"
                        color="bg-gradient-to-r from-[#D9A441] to-[#B8791A]"
                        className="[&_.bg-\[\#F5EDD8\]]:bg-white/15"
                    />
                    <p className="text-[10px] text-white/30 mt-1 text-right">{xpToNextLevel.toLocaleString()} XP to next level</p>
                </div>
            )}
            
            {/* Mobile/Collapsed Logout */}
            {isCollapsed && (
                <button 
                    onClick={logout}
                    className="w-full mt-4 flex items-center justify-center text-white/40 hover:text-red-400 p-2 rounded transition-colors"
                    title="Logout"
                >
                    <LogOut size={18} />
                </button>
            )}
        </div>
    );
}

/* ─── Main Sidebar ──────────────────────────────────────────────────────────── */
export default function DashboardSidebar() {
    const { isExpanded, isMobileOpen, closeMobile } = useSidebar();
    const isCollapsed = !isExpanded;

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={closeMobile}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Panel */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen z-50 flex flex-col
                    bg-[#0B1220] border-r border-white/8
                    transition-[width,transform] duration-300 ease-in-out
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    ${isCollapsed ? "w-[64px]" : "w-[240px]"}
                `}
                aria-label="Dashboard navigation"
            >
                <SidebarLogo isCollapsed={isCollapsed} />

                {/* Nav Items */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-hide">
                    {navGroups.map((group) => (
                        <NavGroup key={group.id} group={group} isCollapsed={isCollapsed} />
                    ))}

                    {/* Settings — always at bottom of nav */}
                    <div className="px-2 mt-2 pt-2 border-t border-white/10">
                        <NavItem label="Settings" href="/dashboard/settings" icon="Settings" isCollapsed={isCollapsed} />
                    </div>
                </nav>

                <UserCard isCollapsed={isCollapsed} />
            </aside>
        </>
    );
}
