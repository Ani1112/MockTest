import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Clock } from "lucide-react";

interface UpcomingTest {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  hasReminder: boolean;
}

interface UpcomingTestsListProps {
  tests?: UpcomingTest[];
}

const UpcomingTestsList = ({
  tests = [
    {
      id: "1",
      title: "General Knowledge Mock Test",
      date: "2023-10-15",
      time: "10:00 AM",
      duration: "2 hours",
      hasReminder: true,
    },
    {
      id: "2",
      title: "Mathematics Practice Exam",
      date: "2023-10-18",
      time: "2:30 PM",
      duration: "1.5 hours",
      hasReminder: false,
    },
    {
      id: "3",
      title: "Science Comprehensive Test",
      date: "2023-10-22",
      time: "9:00 AM",
      duration: "3 hours",
      hasReminder: false,
    },
  ],
}: UpcomingTestsListProps) => {
  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Tests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No upcoming tests scheduled
            </p>
          ) : (
            tests.map((test) => (
              <div
                key={test.id}
                className="flex flex-col space-y-2 p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{test.title}</h3>
                  <Button
                    variant={test.hasReminder ? "secondary" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                    title={test.hasReminder ? "Reminder set" : "Set reminder"}
                  >
                    <Bell className="h-3.5 w-3.5" />
                    {test.hasReminder ? "Reminder set" : "Set reminder"}
                  </Button>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(test.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{test.time}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Duration:</span>{" "}
                  {test.duration}
                </div>
              </div>
            ))
          )}
          {tests.length > 0 && (
            <div className="flex justify-center pt-2">
              <Button variant="ghost" size="sm" className="text-primary">
                View all scheduled tests
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTestsList;
