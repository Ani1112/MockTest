import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, Bell, User, LogOut, Settings, Home } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  notifications?: number;
}

const Header = ({
  userName = "John Doe",
  userAvatar = "",
  notifications = 3,
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-background border-b border-border sticky top-0 z-50">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">TestPrep</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link
            to="/test-series"
            className="text-foreground hover:text-primary transition-colors"
          >
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Test Series</span>
            </div>
          </Link>
          <Link
            to="/progress"
            className="text-foreground hover:text-primary transition-colors"
          >
            <div className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>My Progress</span>
            </div>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                {notifications}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
