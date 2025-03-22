import React from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, CheckCircle, Clock, Info } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: "reminder" | "result" | "info";
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "Test Reminder",
      description:
        "Your General Knowledge Mock Test is scheduled for tomorrow at 10:00 AM.",
      date: "2023-10-14",
      read: false,
      type: "reminder",
    },
    {
      id: "2",
      title: "Test Result Available",
      description: "Your Mathematics Practice Exam results are now available.",
      date: "2023-10-13",
      read: true,
      type: "result",
    },
    {
      id: "3",
      title: "New Test Series Added",
      description:
        "A new UPSC Civil Services test series has been added to your dashboard.",
      date: "2023-10-10",
      read: false,
      type: "info",
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "result":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "info":
        return <Info className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Bell className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-500">
                  No notifications yet
                </p>
                <p className="text-sm text-gray-400">
                  When you receive notifications, they will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={notification.read ? "bg-white" : "bg-blue-50"}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getIconForType(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {new Date(notification.date).toLocaleDateString()}
                          </span>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.description}
                      </p>
                      <div className="flex justify-end mt-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
