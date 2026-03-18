export const menu = [
    {
    name: "Dashboard",
    path: "/dashboard",
    
  },
  {
    name: "Users",
    path: "/dashboard/user",
    submenu: [
      { name: "Add User", path: "/dashboard/user/add" }
    ]
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    submenu: [
      { name: "Profiles", path: "/dashboard/settings/profile" }
    ]
  }
];