import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import QuestionManager, { Question } from "./QuestionManager";
import { Clock, Save, ArrowLeft } from "lucide-react";

interface TestData {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
}

const TestCreator: React.FC = () => {
  const navigate = useNavigate();
  const [testData, setTestData] = useState<TestData>({
    id: `test-${Date.now()}`,
    title: "",
    description: "",
    duration: 60,
    questions: [],
  });

  const handleInputChange = (field: keyof TestData, value: string | number) => {
    setTestData({
      ...testData,
      [field]: value,
    });
  };

  const handleQuestionsUpdate = (questions: Question[]) => {
    setTestData({
      ...testData,
      questions,
    });
  };

  const handleSaveTest = () => {
    // In a real app, this would save the test to a database
    console.log("Saving test:", testData);

    // For now, we'll just navigate back to the dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>

        <Card className="mb-4 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Create New Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-title">Test Title</Label>
              <Input
                id="test-title"
                value={testData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., UPSC Civil Services - General Studies Paper I"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="test-description">Description</Label>
              <Textarea
                id="test-description"
                value={testData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Briefly describe what this test covers..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="test-duration">Duration (minutes)</Label>
              <div className="flex items-center mt-1">
                <Input
                  id="test-duration"
                  type="number"
                  min="1"
                  value={testData.duration}
                  onChange={(e) =>
                    handleInputChange(
                      "duration",
                      parseInt(e.target.value) || 60,
                    )
                  }
                  className="w-32"
                />
                <Clock className="h-4 w-4 ml-2 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Test Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <QuestionManager
              questions={testData.questions}
              onQuestionsUpdate={handleQuestionsUpdate}
            />

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> You have added{" "}
                {testData.questions.length} questions to this test.
                {testData.questions.length === 0 &&
                  " Please add at least one question before saving."}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4">
            <Button
              onClick={handleSaveTest}
              disabled={!testData.title || testData.questions.length === 0}
            >
              <Save className="h-4 w-4 mr-2" /> Save Test
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TestCreator;
