import React from "react";
import Layout from "@/components/layout/Layout";
import TestSeriesGrid from "@/components/dashboard/TestSeriesGrid";

export default function TestSeriesPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Test Series</h1>
        <TestSeriesGrid />
      </div>
    </Layout>
  );
}
