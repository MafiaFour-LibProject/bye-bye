import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { data } from "react-router";
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
      // username: data.username,
      email: data.email,
      password: data.password,
    };

    setIsSubmitting(true);

    try {
      const res = await ApiSignUp(payload);
      console.log(res);
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.message) || "Oops! An error Occured.";
    } finally {
      setIsSubmitting(false);
    }
  };
  const isError = Object.keys(errors).length > 0;

  return (
    <div className="my-[30px] mx-[200px] flex flex-col md:flex-row items-center justify-center px-6 py-10 bg-white shadow-2xl rounded-2xl ">
      <div className="w-full md:w-1/2 max-w-md mt-9">
        <h2 className="font-bold text-4xl text-center   text-pink-600 justify-center mb-9">
          Get Started
        </h2>

        <form
          className=" h-screen p-[20px] w-full object-cover rounded-lg space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-1">
            <label className="text-base font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3 "
              type="text"
              placeholder="Name"
              id="name"
              {...register("name", { required: "name is required" })}
            />
            {errors?.name && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </div>

          {/* <div className="flex flex-col space-y-2">
            <label className="text-base font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-8 text-gray-500"
              type="text"
              id="username"
              {...register("username", { required: "username is required" })}
            />
            {errors?.userName && (
              <span userName="text-red-600">{errors.UserName.message}</span>
            )}
          </div> */}

          <div className="flex flex-row justify-between">
            {/* <div className="flex flex-col space-y-2">
              <label className="text-base font-medium" htmlFor="dob">
                Date of Birth
              </label>
              <input
                className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-8 text-gray-500"
                type="date"
                id="dob"
                {...register("dob", { required: "date of birth is required" })}
              />
            </div> */}

            <div className="flex flex-col space-y-2 w-2xl  mt-1">
              <label htmlFor="Gender">Role</label>
              <select
                className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3 text-gray-500 w-full "
                id="role"
                {...register("role", { required: "role is required" })}
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email  mt-1" className="text-base font-medium">
              Email
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="email"
              id="email"
              {...register("email", { required: "email is required" })}
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col space-y-2  mt-2">
            <label htmlFor="password" className="text-base font-medium">
              Create Password
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="password"
              id="password"
              {...register("password", { required: "password is required" })}
              placeholder="********"
            />
            {errors?.password && (
              <span password="text-red-600">{errors.password.message}</span>
            )}
          </div>

          {/* <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="text-base font-medium">
              Confirm Password
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="password"
              placeholder="********"
              id="confirmPassword"
            />
            {errors?.confirmPassword && (
              <span confirmPassword="text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div> */}

          <button
            type="submit"
            disabled={isError}
            onClick={handleSubmit}
            className={`${
              isError ? "bg-gray-300 cursor-not-allowed  " : "bg-pink-600 hover:bg-pink-500   "
            }  "w-full text-white  mt-4  cursor-pointer md:items-center font-semibold  py-2 px-6 rounded-sm`}
          >
            {isSubmitting ? "Submitting...." : " Sign Up"}
          </button>

          <p className="text-base text-center mt-2  mr-30">
            Already have an account?&nbsp;
            <span
            onClick={()=>navigate("/login")}
              className="font-medium cursor-pointer text-pink-700 hover:underline"
            >
              Log in
            </span>
          </p>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img
          className="w-full h-auto object-cover max-h-[600px] rounded-2xl cursor-pointer "
          src="/Black1.jpg"
          alt="black"
        />
      </div>
    </div>
  );
};

export default SignupPage;
