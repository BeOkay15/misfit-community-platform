import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <div className="flex flex-row gap-3 pb-4">
        <img src="/favicon.svg" alt="Logo" width="50" />
        <h1 className="text-3xl font-bold text-[#4B5563] my-auto">Your Company</h1>
      </div>
      <div className="text-sm font-light text-[#6B7280] pb-8">
        Login to your account on Your Company.
      </div>

      {/* Login Form */}
      <form className="flex flex-col">
        <div className="pb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">
            Email
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              📧
            </span>
            <input
              type="email"
              name="email"
              id="email"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="name@company.com"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="pb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">
            Password
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              🔒
            </span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
              autoComplete="new-password"
            />
          </div>
        </div>

        <button type="submit" className="w-full text-white bg-[#4F46E5] font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">
          Login
        </button>

        <div className="text-sm font-light text-[#6B7280]">
          Don't have an account yet?{" "}
          <a href="#" className="font-medium text-[#4F46E5] hover:underline">
            Sign Up
          </a>
        </div>
      </form>

      {/* OR Divider */}
      <div className="relative flex py-8 items-center">
        <div className="grow border-t border-gray-200"></div>
        <span className="shrink mx-4 font-medium text-gray-500">OR</span>
        <div className="grow border-t border-gray-200"></div>
      </div>

      {/* Social Logins */}
      <div className="flex flex-row gap-2 justify-center">
        <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
          🐙 <span className="font-medium mx-auto">Github</span>
        </button>
        <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
          🐦 <span className="font-medium mx-auto">Twitter</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
