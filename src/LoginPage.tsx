import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertCircle,
  AtSign,
  KeyRound,
  User,
  ShieldCheck,
  School,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Custom theme colors
const theme = {
  black: "#000000",
  primary: "#CF0F47",
  secondary: "#FF0B55",
};

const SIGNIN = () => {
  const [selectedTab, setSelectedTab] = useState("student");
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setAdminId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, show an error if fields are empty
      if (
        (selectedTab === "student" && (!email || !password)) ||
        (selectedTab === "admin" && (!adminId || !password))
      ) {
        setError("Please fill in all required fields");
      } else {
        // Successful login would redirect here
        console.log("Sign in successful", {
          userType: selectedTab,
          email: selectedTab === "student" ? email : undefined,
          adminId: selectedTab === "admin" ? adminId : undefined,
          password: "********", // Don't log actual password
          rememberMe,
        });
        // Redirect would happen here
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-black text-white">
        <CardHeader className="space-y-2 text-center border-b border-gray-800 pb-6">
          <div className="flex justify-center mb-2">
            <School
              className="h-12 w-12 text-pink-600"
              style={{ color: theme.primary }}
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Campus Item Finder
          </CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full text-white"
        >
          <TabsList className="grid grid-cols-2 w-full bg-gray-900">
            <TabsTrigger
              value="student"
              className="text-white data-[state=active]:bg-pink-600 data-[state=active]:text-white"
              style={{
                "--tab-active-bg": theme.primary,
                "--tab-hover-bg": theme.secondary,
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Student
            </TabsTrigger>
            <TabsTrigger
              value="admin"
              className="text-white data-[state=active]:bg-pink-600 data-[state=active]:text-white"
              style={{
                "--tab-active-bg": theme.primary,
                "--tab-hover-bg": theme.secondary,
              }}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Administrator
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSignIn}>
            {/* Student Tab Content */}
            <TabsContent value="student" className="space-y-4 p-1">
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      className="pl-10 bg-gray-900 border-gray-800 focus:border-pink-600 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ "--input-focus-border": theme.primary }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-gray-900 border-gray-800 focus:border-pink-600 text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ "--input-focus-border": theme.primary }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    className="border-gray-600 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
                    style={{ "--checkbox-checked-bg": theme.primary }}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal text-gray-300"
                  >
                    Remember me for 30 days
                  </Label>
                </div>
              </CardContent>
            </TabsContent>

            {/* Admin Tab Content */}
            <TabsContent value="admin" className="space-y-4 p-1">
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="adminId" className="text-gray-300">
                    Admin ID
                  </Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="adminId"
                      placeholder="Admin ID"
                      className="pl-10 bg-gray-900 border-gray-800 focus:border-pink-600 text-white"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      style={{ "--input-focus-border": theme.primary }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPassword" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-gray-900 border-gray-800 focus:border-pink-600 text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ "--input-focus-border": theme.primary }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adminRemember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    className="border-gray-600 data-[state=checked]:bg-pink-600 data-[state=checked]:border-pink-600"
                    style={{ "--checkbox-checked-bg": theme.primary }}
                  />
                  <Label
                    htmlFor="adminRemember"
                    className="text-sm font-normal text-gray-300"
                  >
                    Remember me for 30 days
                  </Label>
                </div>
              </CardContent>
            </TabsContent>

            {/* Error Alert */}
            {error && (
              <div className="px-6">
                <Alert
                  variant="destructive"
                  className="bg-red-900 border-red-700 text-white"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}

            {/* Buttons */}
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <Button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                style={{
                  backgroundColor: theme.primary,
                  "--btn-hover-bg": theme.secondary,
                }}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-400">
                  {selectedTab === "student"
                    ? "New to Campus Item Finder?"
                    : "Need help accessing your admin account?"}
                </p>

                <div className="text-sm">
                  <a
                    href="#"
                    className="text-pink-500 hover:text-pink-400"
                    style={{ color: theme.secondary }}
                  >
                    Contact IT Support
                  </a>
                </div>
              </div>
            </CardFooter>
          </form>
        </Tabs>
      </Card>
    </div>
  );
};

export default SIGNIN;
