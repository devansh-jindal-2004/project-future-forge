"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, FolderKanban, GraduationCap, User } from "lucide-react";

const bottomNavItems = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
    { label: "Projects", href: "/dashboard/projects/discover", icon: FolderKanban },
    { label: "Mentor", href: "/mentorship/overview", icon: GraduationCap },
    { label: "Profile", href: "/dashboard/profile", icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[rgba(192,138,30,0.15)] shadow-[0_-4px_20px_rgba(11,18,32,0.08)] safe-area-pb"
            aria-label="Mobile bottom navigation"
        >
            <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
                {bottomNavItems.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-colors min-w-[56px] ${
                                isActive ? "text-[#C08A1E]" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                            }`}
                            aria-label={label}
                            aria-current={isActive ? "page" : undefined}
                        >
                            <Icon
                                size={22}
                                className={isActive ? "fill-[rgba(192,138,30,0.15)]" : ""}
                                strokeWidth={isActive ? 2.5 : 1.8}
                            />
                            <span className="text-[10px] font-bold leading-none">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
