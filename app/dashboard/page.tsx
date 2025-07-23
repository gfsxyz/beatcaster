import { Navbar } from "@/components/Nav";
import Overview from "@/components/Overview";

const Dashboard = async () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen py-8 space-y-12 px-2">
      <Navbar />

      <main className="flex flex-col gap-16 px-4 lg:flex-row">
        <h1 className="sr-only">Dashboard</h1>
        <Overview />
      </main>
    </div>
  );
};
export default Dashboard;
