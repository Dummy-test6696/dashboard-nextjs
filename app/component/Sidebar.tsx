"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { menu } from "@/app/(admin)/menu";
import { ChevronRight, Menu, X, PanelLeftClose, PanelLeft } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (path: string) => pathname === path;
  const isParentActive = (item: (typeof menu)[0]) =>
    item.submenu?.some((sub) => pathname === sub.path) || pathname === item.path;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const SidebarContent = () => (
    <div
      className={`flex h-screen flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${
        collapsed ? "w-[60px]" : "w-[240px]"
      }`}
    >
      {/* Header */}
      <div
        className={`flex h-14 items-center border-b border-zinc-200 dark:border-zinc-800 ${
          collapsed ? "justify-center px-0" : "gap-2.5 px-4"
        }`}
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-zinc-900 text-[13px] font-semibold text-white dark:bg-white dark:text-zinc-900">
          A
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Acme HQ
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Admin panel</p>
          </div>
        )}
        {/* Desktop collapse toggle */}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="hidden rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 lg:flex"
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {menu.map((item) => {
          const active = isParentActive(item);
          const open = openMenus[item.name] ?? active;

          return (
            <div key={item.name} className="mb-px">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    title={collapsed ? item.name : undefined}
                    className={`group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                    } ${collapsed ? "justify-center" : ""}`}
                  >
                   
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left font-medium">{item.name}</span>
                        <ChevronRight
                          className={`h-3.5 w-3.5 flex-shrink-0 text-zinc-400 transition-transform duration-200 ${
                            open ? "rotate-90" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {!collapsed && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        open ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-2 mt-px border-l border-zinc-200 pl-2 dark:border-zinc-800">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.path}
                            className={`flex items-center rounded-md py-1.5 pl-3 pr-2 text-sm transition-colors ${
                              isActive(sub.path)
                                ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  title={collapsed ? item.name : undefined}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                    isActive(item.path)
                      ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  
                  {!collapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-200 p-2 dark:border-zinc-800">
        <div
          className={`flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[11px] font-semibold text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
            JD
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                Jane Doe
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger button — visible on mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex items-center justify-center rounded-md border border-zinc-200 bg-white p-1.5 text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-full w-[240px] flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-3.5 z-10 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Reuse the same sidebar content structure for mobile */}
          {/* Header */}
          <div className="flex h-14 items-center gap-2.5 border-b border-zinc-200 px-4 dark:border-zinc-800">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-zinc-900 text-[13px] font-semibold text-white dark:bg-white dark:text-zinc-900">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Acme HQ
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Admin panelsss </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 py-2">
            {menu.map((item) => {
              const active = isParentActive(item);
              const open = openMenus[item.name] ?? active;

              return (
                <div key={item.name} className="mb-px">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                          active
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                        }`}
                      >
                  
                        <span className="flex-1 text-left font-medium">{item.name}</span>
                        
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ease-in-out ${
                          open ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="ml-2 mt-px border-l border-zinc-200 pl-2 dark:border-zinc-800">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.path}
                              className={`flex items-center rounded-md py-1.5 pl-3 pr-2 text-sm transition-colors ${
                                isActive(sub.path)
                                  ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                        isActive(item.path)
                          ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                      }`}
                    >
                      
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-zinc-200 p-2 dark:border-zinc-800">
            <div className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[11px] font-semibold text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
                JD
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Jane Doe
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}