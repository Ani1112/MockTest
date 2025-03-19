import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, BarChart } from "lucide-react";

interface TestSeriesCardProps {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  totalTests?: number;
  duration?: string;
  progress?: number;
  thumbnail?: string;
  onStart?: () => void;
  onContinue?: () => void;
}

const TestSeriesCard = ({
  id = "test-series-1",
  title = "UPSC Civil Services",
  description = "Comprehensive test series for UPSC Civil Services Examination with topic-wise and full-length mock tests.",
  category = "Government Exams",
  totalTests = 25,
  duration = "120 hours",
  progress = 0,
  thumbnail = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80",
  onStart = () => {},
  onContinue = () => {},
}: TestSeriesCardProps) => {
  const hasStarted = progress > 0;
  const navigate = useNavigate();

  const handleStart = () => {
    // Call the provided onStart callback if it exists
    if (onStart) {
      onStart();
    } else {
      // Navigate to the test interface
      navigate(`/test/${id}`);
    }
  };

  const handleContinue = () => {
    // Call the provided onContinue callback if it exists
    if (onContinue) {
      onContinue();
    } else {
      // Navigate to the test interface
      navigate(`/test/${id}`);
    }
  };

  return (
    <Card className="w-full max-w-[320px] h-[180px] overflow-hidden flex flex-col bg-white">
      <div className="flex h-full">
        <div className="w-1/3 bg-gray-200 relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-md">
            {category}
          </div>
        </div>

        <div className="w-2/3 flex flex-col justify-between">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-base line-clamp-1">{title}</CardTitle>
            <CardDescription className="text-xs line-clamp-2 mt-1">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-3 pt-0 flex-grow">
            <div className="flex items-center text-xs text-gray-600 mt-2 space-x-4">
              <div className="flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                <span>{totalTests} Tests</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{duration}</span>
              </div>
            </div>

            {hasStarted && (
              <div className="mt-2">
                <div className="text-xs text-gray-600 mb-1 flex justify-between">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-3 pt-0">
            <Button
              size="sm"
              className="w-full"
              onClick={hasStarted ? handleContinue : handleStart}
            >
              {hasStarted ? "Continue" : "Start Series"}
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default TestSeriesCard;
