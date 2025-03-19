import React, { useState, useEffect } from "react";
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
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle,
  Settings,
} from "lucide-react";
import QuestionManager, { Question } from "./QuestionManager";
import { upscTestData } from "./UPSCTestData";
import { sscTestData } from "./SSCTestData";
import { jeeTestData } from "./JEETestData";

interface TestData {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
}

const TestInterface = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testData, setTestData] = useState<TestData | null>(null);

  // Fetch test data from API
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        // In a real implementation, this would fetch from the API
        // const data = await testSeriesApi.getTestSeriesById(testId || '');
        // const questions = await testSeriesApi.getTestSeriesQuestions(testId || '');
        // setTestData({ ...data, questions });

        // For now, we'll use mock data
        let mockTestData: TestData;

        if (testId === "upsc-civil-services") {
          // UPSC Civil Services
          mockTestData = {
            id: testId,
            title: "UPSC Civil Services",
            description:
              "Comprehensive test series for UPSC Civil Services with questions in Hindi language.",
            duration: 60, // 60 minutes
            questions: upscTestData,
          };
        } else if (testId === "ssc-cgl") {
          // SSC Combined Graduate Level
          mockTestData = {
            id: testId,
            title: "SSC Combined Graduate Level (CGL)",
            description:
              "Complete test series for SSC CGL covering General Knowledge, Reasoning, and Quantitative Aptitude.",
            duration: 60, // 60 minutes
            questions: sscTestData,
          };
        } else if (testId === "jee-advanced") {
          // JEE Advanced
          mockTestData = {
            id: testId,
            title: "JEE Advanced",
            description:
              "Comprehensive test series for JEE Advanced covering Physics, Chemistry, and Mathematics.",
            duration: 60, // 60 minutes
            questions: jeeTestData,
          };
        } else if (testId === "test-series-1") {
          // Bank PO & Clerk
          mockTestData = {
            id: testId,
            title: "Bank PO & Clerk",
            description:
              "Comprehensive test series for Bank PO & Clerk exams covering Banking Awareness, Reasoning, Quantitative Aptitude, and English.",
            duration: 180,
            questions: [
              {
                id: "q-1",
                text: "What is the full form of RBI?",
                options: [
                  "A. Reserve Bank of India",
                  "B. Regional Bank of India",
                  "C. Reserve Bureau of India",
                  "D. Regional Bureau of India",
                ],
                correctAnswer: 0,
              },
              {
                id: "q-2",
                text: "Which of the following is not a type of bank account?",
                options: [
                  "A. Savings Account",
                  "B. Current Account",
                  "C. Fixed Deposit Account",
                  "D. Loan Account",
                ],
                correctAnswer: 3,
              },
              {
                id: "q-3",
                text: "What is the primary function of a bank?",
                options: [
                  "A. Issuing Currency",
                  "B. Accepting Deposits",
                  "C. Regulating Foreign Exchange",
                  "D. All of the above",
                ],
                correctAnswer: 3,
              },
              {
                id: "q-4",
                text: "What is the current repo rate as of 2023 (approximate)?",
                options: ["A. 4.00%", "B. 5.00%", "C. 6.00%", "D. 7.00%"],
                correctAnswer: 2,
              },
              {
                id: "q-5",
                text: "Which of the following is a digital payment system in India?",
                options: [
                  "A. NEFT",
                  "B. RTGS",
                  "C. UPI",
                  "D. All of the above",
                ],
                correctAnswer: 3,
              },
            ],
          };
        } else if (testId === "test-series-2") {
          // GATE Computer Science
          mockTestData = {
            id: testId,
            title: "GATE Computer Science",
            description:
              "Comprehensive test series for GATE Computer Science with topic-wise and full-length mock tests.",
            duration: 180,
            questions: [
              {
                id: "q-1",
                text: "What is the time complexity of binary search?",
                options: [
                  "A. O(n)",
                  "B. O(log n)",
                  "C. O(n log n)",
                  "D. O(n²)",
                ],
                correctAnswer: 1,
              },
              {
                id: "q-2",
                text: "Which of the following is a non-linear data structure?",
                options: ["A. Array", "B. Linked List", "C. Tree", "D. Queue"],
                correctAnswer: 2,
              },
              {
                id: "q-3",
                text: "What is the full form of SQL?",
                options: [
                  "A. Structured Query Language",
                  "B. Simple Query Language",
                  "C. Structured Question Language",
                  "D. Simple Question Language",
                ],
                correctAnswer: 0,
              },
              {
                id: "q-4",
                text: "Which of the following is a type of operating system?",
                options: [
                  "A. Windows",
                  "B. Linux",
                  "C. macOS",
                  "D. All of the above",
                ],
                correctAnswer: 3,
              },
              {
                id: "q-5",
                text: "What is the primary function of an ALU in a CPU?",
                options: [
                  "A. Perform arithmetic and logic operations",
                  "B. Store data",
                  "C. Manage input/output operations",
                  "D. Control other components",
                ],
                correctAnswer: 0,
              },
            ],
          };
        } else {
          // Default test data
          mockTestData = {
            id: testId || "test-1",
            title: "NEET Medical Entrance Exam",
            description:
              "This exam covers topics in Biology, Physics, and Chemistry for medical school entrance.",
            duration: 180, // 3 hours in minutes
            questions: [
              {
                id: "q-1",
                text: "Which of the following is the powerhouse of the cell?",
                options: [
                  "A) Nucleus",
                  "B) Mitochondria",
                  "C) Ribosome",
                  "D) Endoplasmic Reticulum",
                ],
                correctAnswer: 1, // B) Mitochondria
              },
              {
                id: "q-2",
                text: "Which organ secretes insulin?",
                options: [
                  "A) Liver",
                  "B) Pancreas",
                  "C) Kidney",
                  "D) Gallbladder",
                ],
                correctAnswer: 1, // B) Pancreas
              },
              {
                id: "q-3",
                text: "DNA is made up of which of the following?",
                options: [
                  "A) Proteins",
                  "B) Lipids",
                  "C) Nucleotides",
                  "D) Carbohydrates",
                ],
                correctAnswer: 2, // C) Nucleotides
              },
              {
                id: "q-4",
                text: "The universal donor blood group is:",
                options: ["A) A", "B) B", "C) AB", "D) O"],
                correctAnswer: 3, // D) O
              },
              {
                id: "q-5",
                text: "Which vitamin is known as Ascorbic Acid?",
                options: [
                  "A) Vitamin A",
                  "B) Vitamin B",
                  "C) Vitamin C",
                  "D) Vitamin D",
                ],
                correctAnswer: 2, // C) Vitamin C
              },
              // Additional questions removed for brevity
            ],
          };
        }

        setTestData(mockTestData);
        setTimeLeft(mockTestData.duration * 60); // Convert minutes to seconds
      } catch (error) {
        console.error("Error fetching test data:", error);
        // Handle error state
      }
    };

    fetchTestData();
  }, [testId]);

  // Handle questions update from QuestionManager
  const handleQuestionsUpdate = (updatedQuestions: Question[]) => {
    if (testData) {
      setTestData({
        ...testData,
        questions: updatedQuestions,
      });
    }
  };

  // Timer effect
  useEffect(() => {
    if (!testData || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testData, timeLeft]);

  if (!testData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-center mt-4">Loading test...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleMarkForReview = (questionIndex: number) => {
    setMarkedForReview((prev) => {
      if (prev.includes(questionIndex)) {
        return prev.filter((q) => q !== questionIndex);
      } else {
        return [...prev, questionIndex];
      }
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    setIsSubmitting(true);

    // Calculate the results data based on current answers
    const correctCount = Object.entries(answers).reduce(
      (count, [qIndex, answerIndex]) => {
        const questionIndex = parseInt(qIndex);
        return testData.questions[questionIndex].correctAnswer === answerIndex
          ? count + 1
          : count;
      },
      0,
    );

    const incorrectCount = Object.keys(answers).length - correctCount;
    const unattemptedCount =
      testData.questions.length - Object.keys(answers).length;

    const resultsData = {
      testId: testData.id,
      testName: testData.title,
      totalQuestions: testData.questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      unattempted: unattemptedCount,
      timeTaken: formatTime(testData.duration * 60 - timeLeft),
      score: Math.round((correctCount / testData.questions.length) * 100),
      passingScore: 60,
    };

    // In a real app, you would send the answers to the server here
    // Example:
    // try {
    //   await testSeriesApi.saveTestResult({
    //     user_id: user?.id || 'anonymous',
    //     test_series_id: testData.id,
    //     score: resultsData.score,
    //     total_questions: resultsData.totalQuestions,
    //     correct_answers: resultsData.correctAnswers,
    //     incorrect_answers: resultsData.incorrectAnswers,
    //     unattempted: resultsData.unattempted,
    //     time_taken: resultsData.timeTaken,
    //   });
    // } catch (error) {
    //   console.error('Error saving test results:', error);
    // }

    // Store results in localStorage to pass to results page
    localStorage.setItem("testResults", JSON.stringify(resultsData));

    setTimeout(() => {
      navigate(`/test-results/${testId}`);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage =
    (Object.keys(answers).length / testData.questions.length) * 100;

  const currentQuestionData = testData.questions[currentQuestion];
  const isMarkedForReview = markedForReview.includes(currentQuestion);
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isSubmitting ? (
        <Card className="w-full max-w-md mx-auto mt-20">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">
                Submitting Your Test
              </h2>
              <p className="text-center text-gray-500">
                Please wait while we process your answers...
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="container mx-auto max-w-6xl">
          {/* Admin Controls - Only visible to test creators/admins */}
          <div className="mb-4">
            <QuestionManager
              questions={testData.questions}
              onQuestionsUpdate={handleQuestionsUpdate}
            />
          </div>

          {/* Test Header */}
          <Card className="mb-4 bg-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">
                  {testData.title}
                </CardTitle>
                <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-md">
                  <Clock className="h-4 w-4 text-red-500" />
                  <span className="text-red-500 font-medium">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    {testData.description}
                  </p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">
                      Question {currentQuestion + 1} of{" "}
                      {testData.questions.length}
                    </span>
                    <Progress value={progressPercentage} className="h-1 mt-1" />
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to submit your test?",
                      )
                    ) {
                      handleSubmitTest();
                    }
                  }}
                >
                  Submit Test
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Question Panel */}
            <div className="lg:col-span-3">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium">
                      Question {currentQuestion + 1}
                      {isMarkedForReview && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Flag className="h-3 w-3 mr-1" /> Marked for review
                        </span>
                      )}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkForReview(currentQuestion)}
                      className={isMarkedForReview ? "bg-yellow-50" : ""}
                    >
                      <Flag className="h-4 w-4 mr-1" />
                      {isMarkedForReview ? "Unmark" : "Mark for Review"}
                    </Button>
                  </div>

                  <div className="mb-6">
                    {currentQuestionData.hasFormulas ? (
                      <div
                        className="text-gray-800 font-math"
                        dangerouslySetInnerHTML={{
                          __html: currentQuestionData.text,
                        }}
                      />
                    ) : (
                      <p
                        className={`text-gray-800 ${currentQuestionData.language === "hindi" ? "font-hindi" : ""}`}
                      >
                        {currentQuestionData.text}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {currentQuestionData.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedAnswer === index ? "border-primary bg-primary/5" : "hover:bg-gray-50"}`}
                        onClick={() =>
                          handleAnswerSelect(currentQuestion, index)
                        }
                      >
                        <div className="flex items-start">
                          <div
                            className={`flex-shrink-0 h-5 w-5 mr-2 rounded-full border ${selectedAnswer === index ? "border-primary" : "border-gray-300"} flex items-center justify-center`}
                          >
                            {selectedAnswer === index && (
                              <div className="h-3 w-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          {currentQuestionData.hasFormulas ? (
                            <span
                              dangerouslySetInnerHTML={{ __html: option }}
                            />
                          ) : (
                            <span
                              className={
                                currentQuestionData.language === "hindi"
                                  ? "font-hindi"
                                  : ""
                              }
                            >
                              {option}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between px-6 py-4 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleNextQuestion}
                    disabled={currentQuestion === testData.questions.length - 1}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Question Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Question Navigator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="answered">Answered</TabsTrigger>
                      <TabsTrigger value="marked">Marked</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-2">
                      <div className="grid grid-cols-5 gap-2">
                        {testData.questions.map((_, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className={`h-8 w-8 p-0 ${currentQuestion === index ? "ring-2 ring-primary ring-offset-2" : ""} ${
                              answers[index] !== undefined
                                ? "bg-green-50 border-green-200 text-green-700"
                                : markedForReview.includes(index)
                                  ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                                  : ""
                            }`}
                            onClick={() => setCurrentQuestion(index)}
                          >
                            {index + 1}
                            {answers[index] !== undefined && (
                              <CheckCircle className="h-3 w-3 absolute bottom-0 right-0 text-green-500" />
                            )}
                            {markedForReview.includes(index) && (
                              <Flag className="h-3 w-3 absolute bottom-0 right-0 text-yellow-500" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="answered" className="mt-2">
                      <div className="grid grid-cols-5 gap-2">
                        {Object.keys(answers).map((indexStr) => {
                          const index = parseInt(indexStr);
                          return (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className={`h-8 w-8 p-0 ${currentQuestion === index ? "ring-2 ring-primary ring-offset-2" : ""} bg-green-50 border-green-200 text-green-700`}
                              onClick={() => setCurrentQuestion(index)}
                            >
                              {index + 1}
                              <CheckCircle className="h-3 w-3 absolute bottom-0 right-0 text-green-500" />
                            </Button>
                          );
                        })}
                      </div>
                      {Object.keys(answers).length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No questions answered yet
                        </p>
                      )}
                    </TabsContent>
                    <TabsContent value="marked" className="mt-2">
                      <div className="grid grid-cols-5 gap-2">
                        {markedForReview.map((index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className={`h-8 w-8 p-0 ${currentQuestion === index ? "ring-2 ring-primary ring-offset-2" : ""} bg-yellow-50 border-yellow-200 text-yellow-700`}
                            onClick={() => setCurrentQuestion(index)}
                          >
                            {index + 1}
                            <Flag className="h-3 w-3 absolute bottom-0 right-0 text-yellow-500" />
                          </Button>
                        ))}
                      </div>
                      {markedForReview.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No questions marked for review
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 bg-green-50 border border-green-200 rounded mr-2"></div>
                      <span>Answered ({Object.keys(answers).length})</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded mr-2"></div>
                      <span>Marked for review ({markedForReview.length})</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 bg-white border border-gray-200 rounded mr-2"></div>
                      <span>
                        Not visited (
                        {testData.questions.length -
                          Object.keys(answers).length}
                        )
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestInterface;
