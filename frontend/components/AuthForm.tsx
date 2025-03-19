import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">{type === "login" ? "Login" : "Sign Up"}</h2>

        <div className="mb-4 flex items-center border p-2 rounded-lg">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center border p-2 rounded-lg">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg">
          {type === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <a href={type === "login" ? "/signup" : "/login"} className="text-blue-500 hover:underline">
            {type === "login" ? "Sign Up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
