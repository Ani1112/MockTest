import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink, BarChart2 } from "lucide-react";

interface TestResult {
  id: string;
  title: string;
  date: string;
  score: number;
  totalMarks: number;
  percentile: number;
  category: string;
}

interface RecentTestResultsProps {
  results?: TestResult[];
  maxItems?: number;
}

const RecentTestResults = ({
  results = [
    {
      id: "1",
      title: "General Aptitude Mock Test",
      date: "2023-10-15",
      score: 85,
      totalMarks: 100,
      percentile: 92,
      category: "Aptitude",
    },
    {
      id: "2",
      title: "Verbal Reasoning Practice",
      date: "2023-10-12",
      score: 72,
      totalMarks: 90,
      percentile: 78,
      category: "Reasoning",
    },
    {
      id: "3",
      title: "Quantitative Analysis",
      date: "2023-10-08",
      score: 65,
      totalMarks: 80,
      percentile: 85,
      category: "Quantitative",
    },
  ],
  maxItems = 3,
}: RecentTestResultsProps) => {
  const displayResults = results.slice(0, maxItems);

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          Recent Test Results
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800"
          >
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-0">
        <div className="space-y-4">
          {displayResults.map((result) => (
            <div
              key={result.id}
              className="border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-medium text-sm">{result.title}</h4>
                  <p className="text-xs text-gray-500">
                    {result.date} • {result.category}
                  </p>
                </div>
                <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                  <span className="text-green-700 text-xs font-medium">
                    {result.score}/{result.totalMarks}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <div className="bg-gray-100 h-1.5 w-24 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{
                        width: `${(result.score / result.totalMarks) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-600">
                    {result.percentile}th percentile
                  </span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <BarChart2 className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ExternalLink className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full text-sm">
          View Detailed Analysis
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentTestResults;
