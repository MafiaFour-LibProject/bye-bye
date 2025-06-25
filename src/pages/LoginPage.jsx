import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { ApiLogin } from "../services/auth";
import { toast } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    setIsSubmitting(true);

    try {
      const res = await ApiLogin(payload);
      localStorage.setItem("accessToken", res.data.token);
      const userRole = res.data.user.role;
      toast.success("Login successful!");

      if (userRole === "vendor") {
        navigate("/vendor-ads");
      } else {
        navigate("/user-ads");
      }
    } catch (error) {
      toast.error(error?.message || "Oops! An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isError = Object.keys(errors).length > 0;

  return (
    <div className="bg-neutral-200 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        
        {/* Left Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="/Black4.jpg"
            alt="Login visual"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-600 text-center mb-4">
            Bye-Bye Store
          </h2>
          <p className="text-gray-600 text-base sm:text-lg text-center mb-6">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="name@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isError}
              className={`w-full py-3 font-bold rounded-md transition transform ${
                isSubmitting || isError
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-pink-600 text-white hover:bg-pink-500 hover:scale-105"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Log In"}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="mt-6 flex flex-col items-center text-sm">
            <a href="#" className="text-pink-500 hover:underline mb-2">
              Forgot password?
            </a>
            <span className="text-gray-500 mb-2">or</span>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 transition transform hover:scale-105"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
