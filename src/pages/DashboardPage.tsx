import TestSeriesGrid from "@/components/dashboard/TestSeriesGrid";
import RecentTestResults from "@/components/dashboard/RecentTestResults";
import UpcomingTestsList from "@/components/dashboard/UpcomingTestsList";
import ProgressSummary from "@/components/dashboard/ProgressSummary";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/components/auth/AuthProvider";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome, {user?.email?.split("@")[0]}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ProgressSummary />
          </div>
          <div>
            <RecentTestResults />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Test Series</h2>
          <TestSeriesGrid />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Tests</h2>
          <UpcomingTestsList />
        </div>
      </div>
    </Layout>
  );
}
