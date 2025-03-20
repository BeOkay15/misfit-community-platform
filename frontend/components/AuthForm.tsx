// import { useState } from "react";
// import { useRouter } from "next/router";

// interface AuthFormProps {
//   type: "login" | "signup";
// }

// const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const endpoint =
//       type === "signup"
//         ? "http://localhost:5184/api/auth/signup"
//         : "http://localhost:5184/api/auth/login";

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       if (type === "login") {
//         localStorage.setItem("token", data.token); // Store JWT token
//         router.push("/dashboard"); // Redirect to a protected page
//       } else {
//         router.push("/login"); // Redirect to login after signup
//       }
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
//       <div className="flex flex-row gap-3 pb-4">
//       <img src="/Misfits.svg" alt="Logo" width="50" />
//         <h1 className="text-3xl font-bold text-[#4B5563] my-auto">MisFits Community</h1>
//       </div>
//       <div className="text-sm font-light text-[#6B7280] pb-8">
//         {type === "login" ? "Login to your account." : "Create a new account."}
//       </div>

//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       {/* Auth Form */}
//       <form className="flex flex-col" onSubmit={handleSubmit}>
//         <div className="pb-2">
//           <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">
//             Email
//           </label>
//           <div className="relative text-gray-400">
//             <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">📧</span>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
//               placeholder="name@company.com"
//               autoComplete="off"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div className="pb-6">
//           <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">
//             Password
//           </label>
//           <div className="relative text-gray-400">
//             <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">🔒</span>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="••••••••••"
//               className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
//               autoComplete="new-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full text-white bg-[#4F46E5] font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
//           disabled={loading}
//         >
//           {loading ? "Processing..." : type === "login" ? "Login" : "Sign Up"}
//         </button>

//         <div className="text-sm font-light text-[#6B7280]">
//           {type === "login" ? "Don't have an account yet?" : "Already have an account?"}{" "}
//           <a href={type === "login" ? "/signup" : "/login"} className="font-medium text-[#4F46E5] hover:underline">
//             {type === "login" ? "Sign Up" : "Login"}
//           </a>
//         </div>
//       </form>

//       {/* OR Divider */}
//       <div className="relative flex py-8 items-center">
//         <div className="grow border-t border-gray-200"></div>
//         <span className="shrink mx-4 font-medium text-gray-500">OR</span>
//         <div className="grow border-t border-gray-200"></div>
//       </div>

//       {/* Social Logins */}
//       <div className="flex flex-row gap-2 justify-center">
//         <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
//           🐙 <span className="font-medium mx-auto">Github</span>
//         </button>
//         <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
//           🐦 <span className="font-medium mx-auto">Twitter</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    try {
      const response = await fetch(`http://localhost:5184/api/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(`${type === "login" ? "Logged in" : "Signed up"} successfully!`);
      if (type === "login") localStorage.setItem("token", data.token);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4 flex items-center border p-2 rounded-lg">
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center border p-2 rounded-lg">
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg"
          onClick={handleSubmit}
        >
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

