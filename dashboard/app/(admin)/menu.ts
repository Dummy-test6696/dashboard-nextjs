export const menu = [
    {
    name: "Dashboard",
    path: "/dashboard",
    
    
  },
  {
    name: "Users",
    path: "/user",
    submenu: [
      { name: "Add User", path: "/user/add" }
    ]
  },
  {
    name: "Settings",
    path: "/settings",
    submenu: [
      { name: "Profiles", path: "/settings/profile" }
    ]
  }
];