import React, { useState, useRef } from "react";
const loginImage = "/portfolio.jpg";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);
  const Image2 = "/Image2.jpg";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login button clicked!");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="bg-neutral-200 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        {
          <div className="md:w-1/2 hidden md:block">
            <img
              src="/Image4.jpg"
              alt="A cool picture for the login page"
              className="rounded-lg object-cover h-full w-full"
            />
          </div>
        }

        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
            B-B Store
          </h2>
          <p className="text-gray-600 mb-8 text-center text-lg">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@example.com"
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2.5 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 text-center flex flex-col items-center">
            <a
              href="#"
              className="font-semibold text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out text-sm mb-2"
            >
              Forgot password
            </a>
            <span className="text-gray-600 text-sm mb-2">or</span>
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
