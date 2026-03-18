import Link from "next/link";
import { menu } from "@/app/dashboard/menu";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <div key={item.name}>
            
            {/* Main Menu */}
            <Link
              href={item.path}
              className="block px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {item.name}
            </Link>

            {/* Submenu */}
            {item.submenu && (
              <div className="ml-4 mt-1 space-y-1">
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.path}
                    className="block px-3 py-1 text-sm text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}