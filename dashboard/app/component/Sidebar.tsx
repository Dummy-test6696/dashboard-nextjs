"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { menu } from "@/app/(admin)/menu";
import { ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (path: string) => pathname === path;
  const isParentActive = (item: (typeof menu)[0]) =>
    item.submenu?.some((sub) => pathname === sub.path) || pathname === item.path;

  return (
    <div className="flex h-screen w-[240px] flex-col border-r border-white/[0.06] bg-[#111317]">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.05] px-4 py-5">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[7px] bg-gradient-to-br from-indigo-500 to-violet-600 text-[13px] font-semibold text-white">
          A
        </div>
        <div>
          <p className="text-sm font-semibold leading-none text-white/90">Acme HQ</p>
          <p className="mt-0.5 text-[10px] text-white/30">Admin panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {menu.map((item) => {
          const active = isParentActive(item);
          const open = openMenus[item.name] ?? active;

          return (
            <div key={item.name} className="mb-0.5">
              {item.submenu ? (
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-all duration-150 ${
                    active
                      ? "bg-indigo-500/15 text-indigo-300"
                      : "text-white/50 hover:bg-white/[0.05] hover:text-white/85"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-sm bg-indigo-500" />
                  )}
                  
                  <span className="flex-1 text-left">{item.name}</span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 flex-shrink-0 opacity-40 transition-transform duration-200 ${
                      open ? "rotate-90" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.path}
                  className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-all duration-150 ${
                    isActive(item.path)
                      ? "bg-indigo-500/15 text-indigo-300"
                      : "text-white/50 hover:bg-white/[0.05] hover:text-white/85"
                  }`}
                >
                  {isActive(item.path) && (
                    <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-sm bg-indigo-500" />
                  )}
                  
                  <span>{item.name}</span>
                </Link>
              )}

              {/* Submenu */}
              {item.submenu && (
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.path}
                      className={`flex items-center gap-2 rounded-md py-1.5 pl-[34px] pr-2.5 text-xs transition-all duration-150 ${
                        isActive(sub.path)
                          ? "text-indigo-400"
                          : "text-white/35 hover:bg-white/[0.04] hover:text-white/70"
                      }`}
                    >
                      <span
                        className={`h-1 w-1 flex-shrink-0 rounded-full ${
                          isActive(sub.path) ? "bg-indigo-400" : "bg-current"
                        }`}
                      />
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.05] p-2">
        <div className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-white/[0.05]">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-red-500 text-[11px] font-semibold text-white">
            JD
          </div>
          <div>
            <p className="text-xs font-medium text-white/70">Jane Doe</p>
            <p className="text-[10px] text-white/30">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}