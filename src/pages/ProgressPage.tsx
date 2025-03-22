import React from "react";
import Layout from "@/components/layout/Layout";
import ProgressSummary from "@/components/dashboard/ProgressSummary";
import RecentTestResults from "@/components/dashboard/RecentTestResults";

export default function ProgressPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Progress</h1>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <ProgressSummary />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Recent Test Results</h2>
            <RecentTestResults maxItems={5} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
