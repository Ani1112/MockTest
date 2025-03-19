import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  BookOpen,
  BarChart2,
  CheckCircle,
  XCircle,
  HelpCircle,
  Clock,
} from "lucide-react";

const TestResults = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  // Get results data from localStorage or use mock data as fallback
  const storedResults = localStorage.getItem("testResults");
  const parsedResults = storedResults ? JSON.parse(storedResults) : null;

  const resultsData = parsedResults || {
    testId: testId || "test-1",
    testName: "UPSC Civil Services - General Studies Paper I",
    totalQuestions: 25,
    correctAnswers: 18,
    incorrectAnswers: 5,
    unattempted: 2,
    timeTaken: "02:15:30",
    score: 72,
    passingScore: 60,
    topicPerformance: [
      { name: "Indian History", correct: 5, incorrect: 1, total: 6 },
      { name: "Geography", correct: 4, incorrect: 2, total: 6 },
      { name: "Economy", correct: 5, incorrect: 0, total: 7 },
      { name: "Polity", correct: 4, incorrect: 2, total: 6 },
    ],
    timeDistribution: [
      { name: "0-30 sec", questions: 8 },
      { name: "30-60 sec", questions: 10 },
      { name: "60-90 sec", questions: 5 },
      { name: "90+ sec", questions: 2 },
    ],
  };

  // Generate topic performance data if not available
  if (!resultsData.topicPerformance) {
    resultsData.topicPerformance = [
      {
        name: "Indian History",
        correct: Math.floor(resultsData.correctAnswers * 0.25),
        incorrect: Math.floor(resultsData.incorrectAnswers * 0.25),
        total: Math.floor(resultsData.totalQuestions * 0.25),
      },
      {
        name: "Geography",
        correct: Math.floor(resultsData.correctAnswers * 0.25),
        incorrect: Math.floor(resultsData.incorrectAnswers * 0.25),
        total: Math.floor(resultsData.totalQuestions * 0.25),
      },
      {
        name: "Economy",
        correct: Math.floor(resultsData.correctAnswers * 0.25),
        incorrect: Math.floor(resultsData.incorrectAnswers * 0.25),
        total: Math.floor(resultsData.totalQuestions * 0.25),
      },
      {
        name: "Polity",
        correct: Math.floor(resultsData.correctAnswers * 0.25),
        incorrect: Math.floor(resultsData.incorrectAnswers * 0.25),
        total: Math.floor(resultsData.totalQuestions * 0.25),
      },
    ];
  }

  // Generate time distribution data if not available
  if (!resultsData.timeDistribution) {
    resultsData.timeDistribution = [
      {
        name: "0-30 sec",
        questions: Math.floor(resultsData.totalQuestions * 0.3),
      },
      {
        name: "30-60 sec",
        questions: Math.floor(resultsData.totalQuestions * 0.4),
      },
      {
        name: "60-90 sec",
        questions: Math.floor(resultsData.totalQuestions * 0.2),
      },
      {
        name: "90+ sec",
        questions: Math.floor(resultsData.totalQuestions * 0.1),
      },
    ];
  }

  const scoreData = [
    { name: "Correct", value: resultsData.correctAnswers, color: "#10b981" },
    {
      name: "Incorrect",
      value: resultsData.incorrectAnswers,
      color: "#ef4444",
    },
    { name: "Unattempted", value: resultsData.unattempted, color: "#d1d5db" },
  ];

  const topicData = resultsData.topicPerformance.map((topic) => ({
    name: topic.name,
    correct: (topic.correct / topic.total) * 100,
    incorrect: (topic.incorrect / topic.total) * 100,
  }));

  const handleBackToDashboard = () => {
    // Clear the test results from localStorage when going back to dashboard
    localStorage.removeItem("testResults");
    navigate("/");
  };

  const handleReviewTest = () => {
    // In a real app, this would navigate to a test review page
    // For now, just go back to the test page
    navigate(`/test/${testId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Results Header */}
        <Card className="mb-4 bg-white">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-xl font-bold">
                  {resultsData.testName}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">Test Results</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBackToDashboard}>
                  <Home className="h-4 w-4 mr-2" /> Dashboard
                </Button>
                <Button onClick={handleReviewTest}>
                  <BookOpen className="h-4 w-4 mr-2" /> Review Test
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Score</p>
                      <h3 className="text-2xl font-bold">
                        {resultsData.score}%
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-full ${resultsData.score >= resultsData.passingScore ? "bg-green-100" : "bg-red-100"}`}
                    >
                      {resultsData.score >= resultsData.passingScore ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                  </div>
                  <Progress
                    value={resultsData.score}
                    className="h-2 mt-2"
                    indicatorClassName={
                      resultsData.score >= resultsData.passingScore
                        ? "bg-green-600"
                        : "bg-red-600"
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Passing score: {resultsData.passingScore}%
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Correct Answers</p>
                      <h3 className="text-2xl font-bold text-green-600">
                        {resultsData.correctAnswers}/
                        {resultsData.totalQuestions}
                      </h3>
                    </div>
                    <div className="p-2 rounded-full bg-green-100">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <Progress
                    value={
                      (resultsData.correctAnswers /
                        resultsData.totalQuestions) *
                      100
                    }
                    className="h-2 mt-2"
                    indicatorClassName="bg-green-600"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Incorrect Answers</p>
                      <h3 className="text-2xl font-bold text-red-600">
                        {resultsData.incorrectAnswers}/
                        {resultsData.totalQuestions}
                      </h3>
                    </div>
                    <div className="p-2 rounded-full bg-red-100">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <Progress
                    value={
                      (resultsData.incorrectAnswers /
                        resultsData.totalQuestions) *
                      100
                    }
                    className="h-2 mt-2"
                    indicatorClassName="bg-red-600"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Time Taken</p>
                      <h3 className="text-2xl font-bold">
                        {resultsData.timeTaken}
                      </h3>
                    </div>
                    <div className="p-2 rounded-full bg-blue-100">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Score Distribution */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Score Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {scoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {scoreData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="text-xs font-medium">{item.name}</p>
                      <p className="text-sm font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Topic Performance */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Topic Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topicData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                      formatter={(value) => [`${value.toFixed(0)}%`, "Score"]}
                    />
                    <Legend />
                    <Bar dataKey="correct" name="Correct" fill="#10b981" />
                    <Bar dataKey="incorrect" name="Incorrect" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Analysis */}
        <Card className="bg-white mb-4">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Time Spent per Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={resultsData.timeDistribution}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="questions"
                    name="Number of Questions"
                    fill="#6366f1"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium flex items-center text-blue-700">
                  <BarChart2 className="h-4 w-4 mr-2" /> Overall Performance
                </h4>
                <p className="mt-1 text-sm text-blue-600">
                  {resultsData.score >= 80
                    ? "Excellent performance! You've demonstrated a strong understanding of the subject matter."
                    : resultsData.score >= 60
                      ? "Good performance. With some focused study in your weaker areas, you can improve further."
                      : "You need to improve your understanding of the core concepts. Focus on the topics where you scored lowest."}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium flex items-center text-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" /> Strengths
                </h4>
                <p className="mt-1 text-sm text-green-600">
                  You performed well in{" "}
                  {resultsData.topicPerformance
                    .filter((topic) => topic.correct / topic.total >= 0.7)
                    .map((topic) => topic.name)
                    .join(", ")}
                  .
                </p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium flex items-center text-red-700">
                  <XCircle className="h-4 w-4 mr-2" /> Areas for Improvement
                </h4>
                <p className="mt-1 text-sm text-red-600">
                  Focus on improving your knowledge in{" "}
                  {resultsData.topicPerformance
                    .filter((topic) => topic.correct / topic.total < 0.7)
                    .map((topic) => topic.name)
                    .join(", ")}
                  .
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium flex items-center text-purple-700">
                  <HelpCircle className="h-4 w-4 mr-2" /> Next Steps
                </h4>
                <p className="mt-1 text-sm text-purple-600">
                  Review the questions you got wrong and understand the correct
                  answers. Consider taking more practice tests focusing on your
                  weaker areas.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t pt-4">
            <Button variant="outline" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
            <Button onClick={handleReviewTest}>Review Test</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TestResults;
