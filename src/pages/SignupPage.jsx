const SignupPage = () => {
  return (
    <div className="my-[30px] mx-[200px] flex flex-col md:flex-row items-center justify-center px-6 py-10 bg-white shadow-2xl rounded-2xl">
      <div className="w-full md:w-1/2 max-w-md">
        <h2
          style={{ color: "#E74C3C" }}
          className="font-bold text-4xl text-center mb-6"
        >
          Get Started
        </h2>

        <form className="bg-gray-50 h-screen p-[20px] rounded-lg space-y-6">
          <div className="flex flex-col space-y-1">
            <label className="text-base font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col space-y-2">
              <label className="text-base font-medium" htmlFor="dob">
                Date of Birth
              </label>
              <input
                className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-8 text-gray-500"
                type="date"
                name="dob"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="Gender">Gender</label>
              <select
                type
                className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-8 text-gray-500"
                name="gender"
                id="gender"
              >
                <option value="male" name="male">
                  Male
                </option>
                <option value="female" name="female">
                  Female
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-base font-medium">
              Email
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-base font-medium">
              Create Password
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-base font-medium">
              Confirm Password
            </label>
            <input
              className="text-base border border-gray-300 bg-gray-50 rounded py-2 px-3"
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <button
            style={{ backgroundColor: "#E74C3C" }}
            className="w-full text-white font-semibold text-base py-2 rounded"
          >
            Sign Up
          </button>

          <p className="text-base text-center">
            Already have an account?&nbsp;
            <span
              style={{ color: "#E74C3C" }}
              className="font-medium cursor-pointer"
            >
              Log in
            </span>
          </p>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img
          className="w-full h-auto object-cover max-h-[600px]"
          src="/images/sign-up-image.png"
          alt="Sign Up"
        />
      </div>
    </div>
  );
};

export default SignupPage;
