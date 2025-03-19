import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Test Prep Platform
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
