import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import TestSeriesCard from "./TestSeriesCard";
import { testSeriesApi } from "@/lib/api";
import { TestSeries } from "@/types/api";

interface TestSeriesGridProps {
  testSeries?: TestSeries[];
  onSearch?: (query: string) => void;
  onFilter?: (category: string) => void;
  onCreateNew?: () => void;
  onSelectSeries?: (id: string) => void;
}

const TestSeriesGrid = ({
  testSeries: initialTestSeries,
  onSearch = (query) => console.log(`Searching for: ${query}`),
  onFilter = (category) => console.log(`Filtering by: ${category}`),
  onCreateNew = () => console.log("Creating new test series"),
  onSelectSeries = (id) => {
    console.log(`Selected series: ${id}`);
    window.location.href = `/test/${id}`;
  },
}: TestSeriesGridProps) => {
  const [testSeries, setTestSeries] = useState<TestSeries[]>(
    initialTestSeries || [],
  );
  const [isLoading, setIsLoading] = useState(!initialTestSeries);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialTestSeries) {
      fetchTestSeries();
    }
  }, [initialTestSeries]);

  const fetchTestSeries = async () => {
    try {
      setIsLoading(true);
      // Mock data for test series categories
      const mockData = [
        {
          id: "upsc-civil-services",
          title: "UPSC Civil Services",
          description:
            "Comprehensive test series for UPSC Civil Services with questions in Hindi language.",
          category: "UPSC",
          total_tests: 20,
          duration: "60 mins",
          thumbnail:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
          created_at: new Date().toISOString(),
        },
        {
          id: "ssc-cgl",
          title: "SSC Combined Graduate Level (CGL)",
          description:
            "Complete test series for SSC CGL covering General Knowledge, Reasoning, and Quantitative Aptitude.",
          category: "SSC",
          total_tests: 20,
          duration: "60 mins",
          thumbnail:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
          created_at: new Date().toISOString(),
        },
        {
          id: "jee-advanced",
          title: "JEE Advanced",
          description:
            "Comprehensive test series for JEE Advanced covering Physics, Chemistry, and Mathematics.",
          category: "Engineering",
          total_tests: 20,
          duration: "60 mins",
          thumbnail:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
          created_at: new Date().toISOString(),
        },
      ];

      setTestSeries(mockData);
      setError(null);
    } catch (err) {
      console.error("Error loading test series:", err);
      setError("Failed to load test series. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-[1000px] bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Available Test Series</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search test series..."
              className="pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Button variant="outline" size="icon" onClick={() => onFilter("all")}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={onCreateNew}>
            <Plus className="h-4 w-4 mr-2" /> New Series
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchTestSeries}>Retry</Button>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testSeries.map((series) => (
              <TestSeriesCard
                key={series.id}
                id={series.id}
                title={series.title}
                description={series.description}
                category={series.category}
                totalTests={series.total_tests}
                duration={series.duration}
                progress={0} // Will be fetched from user progress in a real app
                thumbnail={series.thumbnail}
                onStart={() => onSelectSeries(series.id)}
                onContinue={() => onSelectSeries(series.id)}
              />
            ))}
          </div>

          {testSeries.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-gray-500 mb-4">No test series available</p>
              <Button onClick={onCreateNew}>
                <Plus className="h-4 w-4 mr-2" /> Create New Series
              </Button>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default TestSeriesGrid;
