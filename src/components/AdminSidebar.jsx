import { NavLink } from "react-router-dom";
import { FileText, UserPlus, Users } from "lucide-react";

const AdminSidebar = () => {
  const navItems = [
    {
      label: "Submitted Papers",
      path: "/admin/dashboard/papers",
      icon: <FileText size={18} />,
    },
    {
      label: "Register Reviewer",
      path: "/admin/dashboard/register-reviewer",
      icon: <UserPlus size={18} />,
    },
    // {
    //   label: "Assign Reviewer",
    //   path: "/admin/dashboard/assign-reviewer",
    //   icon: <Users size={18} />,
    // },
  ];

  return (
    <div className="bg-[#521028] text-white w-64 min-h-screen flex flex-col">
      <div className="py-6 px-4 text-center border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md font-medium text-sm transition ${
                isActive
                  ? "bg-white text-[#521028]"
                  : "hover:bg-[#6b1b3a] hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
