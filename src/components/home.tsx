import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, BarChart, Calendar } from "lucide-react";
import TestSeriesGrid from "./dashboard/TestSeriesGrid";
import UpcomingTestsList from "./dashboard/UpcomingTestsList";
import RecentTestResults from "./dashboard/RecentTestResults";
import ProgressSummary from "./dashboard/ProgressSummary";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header would be imported here */}
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          {/* Welcome Section */}
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold">
                  Welcome to Your Test Dashboard
                </CardTitle>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Take New Test
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Test Series</h3>
                    <p className="text-gray-500">6 series available</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="rounded-full bg-green-100 p-3 mr-4">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Upcoming Tests</h3>
                    <p className="text-gray-500">3 scheduled</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <BarChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Performance</h3>
                    <p className="text-gray-500">72% overall progress</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <ProgressSummary />

          {/* Test Series Grid */}
          <div className="w-full">
            <TestSeriesGrid />
          </div>

          {/* Two Column Layout for Upcoming Tests and Recent Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-full">
              <UpcomingTestsList />
            </div>
            <div className="h-full">
              <RecentTestResults />
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <BookOpen className="h-6 w-6" />
                  <span>Browse Test Series</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Schedule a Test</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <BarChart className="h-6 w-6" />
                  <span>View Analytics</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <PlusCircle className="h-6 w-6" />
                  <span>Create Custom Test</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
