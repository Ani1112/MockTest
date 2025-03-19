import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { LineChart, BarChart, Activity, BookOpen, Clock } from "lucide-react";

interface SubjectProgress {
  subject: string;
  progress: number;
  color: string;
}

interface TestStatistic {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface ProgressSummaryProps {
  subjects?: SubjectProgress[];
  overallProgress?: number;
  testsTaken?: number;
  averageScore?: number;
  studyHours?: number;
  statistics?: TestStatistic[];
}

const ProgressSummary = ({
  subjects = [
    { subject: "Mathematics", progress: 78, color: "bg-blue-500" },
    { subject: "Physics", progress: 65, color: "bg-purple-500" },
    { subject: "Chemistry", progress: 82, color: "bg-green-500" },
    { subject: "Biology", progress: 45, color: "bg-yellow-500" },
  ],
  overallProgress = 72,
  testsTaken = 24,
  averageScore = 76,
  studyHours = 48,
  statistics = [
    {
      label: "Tests Taken",
      value: "24",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      description: "Last 30 days",
    },
    {
      label: "Avg. Score",
      value: "76%",
      icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
      description: "Above average",
    },
    {
      label: "Study Hours",
      value: "48h",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      description: "This month",
    },
    {
      label: "Topics Covered",
      value: "32",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      description: "Out of 45",
    },
  ],
}: ProgressSummaryProps) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Your Progress Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subject Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Overall Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Across all subjects
                  </p>
                </div>
                <span className="text-2xl font-bold">{overallProgress}%</span>
              </div>

              <Progress value={overallProgress} className="h-2" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      {stat.icon}
                      <span className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <span className="text-sm font-medium">
                    {subject.progress}%
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", subject.color)}
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 mt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Recommended Focus Areas</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on your performance
                  </p>
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                <li className="text-sm flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  Biology - Cellular Respiration
                </li>
                <li className="text-sm flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  Physics - Wave Mechanics
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressSummary;
