"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://imaginative-light-production.up.railway.app";

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(`${type === "login" ? "Logged in" : "Signed up"} successfully!`);
      
      if (type === "login") {
        localStorage.setItem("token", data.token);
        router.push("/dashboard"); // Redirect to dashboard after login
      } else {
        router.push("/login"); // Redirect to login after signup
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center pb-6">
          <img src="/Misfits.svg" alt="Logo" width="50" />
          <h2 className="text-2xl font-bold text-gray-700">{type === "login" ? "Login" : "Sign Up"}</h2>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4 flex items-center border p-2 rounded-lg">
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none bg-transparent px-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center border p-2 rounded-lg">
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none bg-transparent px-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg transition"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : type === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => router.push(type === "login" ? "/signup" : "/login")}
          >
            {type === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
