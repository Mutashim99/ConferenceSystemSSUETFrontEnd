import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
