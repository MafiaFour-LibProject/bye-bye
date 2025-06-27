import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ApiSignUp } from "../services/auth";
import { toast } from "react-toastify";
import { useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      role: data.role,
      email: data.email,
      password: data.password,
    };

    setIsSubmitting(true);

    try {
      const res = await ApiSignUp(payload);
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Oops! An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isError = Object.keys(errors).length > 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-8 bg-white">
      <div className="w-full md:w-1/2 max-w-md">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-600 text-center mb-4">
          Bye-Bye Store
        </h2>
        <p className="text-gray-600 text-center text-base sm:text-lg mb-6">
          Get Started
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-1">
            <label className="text-base font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="text"
              placeholder="Name"
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors?.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="role" className="text-base font-medium">
              Role
            </label>
            <select
              className="border border-gray-300 bg-gray-50 rounded py-2 px-3 text-gray-500"
              id="role"
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
            {errors?.role && (
              <span className="text-red-600">{errors.role.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-base font-medium">
              Email
            </label>
            <input
              className="border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-base font-medium">
              Create Password
            </label>
            <input
              className="border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="password"
              id="password"
              placeholder="********"
              {...register("password", { required: "Password is required" })}
            />
            {errors?.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isError}
            className={`w-full text-white font-semibold py-2 px-6 rounded ${
              isError
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-500"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?&nbsp;
            <span
              onClick={() => navigate("/login")}
              className="font-medium text-pink-700 hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2 mt-8 md:mt-0 md:ml-10">
        <img
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl"
          src="/Black1.jpg"
          alt="Signup visual"
        />
      </div>
    </div>
  );
};

export default SignupPage;
