import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { login } from "../../api/api";
import loginImage from "../../assets/loginImage.svg"; // Adjust the path to your image

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await login({ email, password });
      const token = response.token;

      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.error("Token not found");
        setError("Login failed: No token received.");
      }

      if (response.status === "success") {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for form container
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  // Animation variants for input fields
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  // Animation variants for image
  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Spinner animation
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
      {/* Left Section with Illustration */}
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-teal-700 rounded-2xl lg:rounded-r-none lg:mr-0"
      >
        <img
          src={loginImage}
          alt="Illustration"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md"
        />
      </motion.div>

      {/* Right Section - Login Form */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white rounded-2xl lg:rounded-l-none lg:ml-0 shadow-xl"
      >
        <div className="w-full max-w-md space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Login to Your Account
          </h2>

          <div className="space-y-4">
            <motion.div variants={inputVariants} custom={0}>
              <label className="block text-gray-700 text-sm font-bold mb-1 text-left">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-10 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  disabled={loading}
                />
              </div>
            </motion.div>

            <motion.div variants={inputVariants} custom={1}>
              <label className="block text-gray-700 text-sm font-bold mb-1 text-left">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zm0 0v5m-6 4h12"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full px-10 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  disabled={loading}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.152-2.002.437-2.928m3.065-2.637A9.97 9.97 0 0112 3c5.523 0 10 4.477 10 10 0 1.147-.193 2.248-.55 3.26m-1.653 2.584l-15-15"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </motion.div>

            <motion.div variants={inputVariants} custom={2} className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                disabled={loading}
              />
              <label className="ml-2 text-sm text-gray-700">Remember me</label>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              onClick={handleLogin}
              className={`w-full p-3 rounded-lg flex items-center justify-center transition duration-300 font-medium ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  variants={spinnerVariants}
                  animate="animate"
                  className="w-6 h-6 border-4 border-t-transparent border-white rounded-full"
                />
              ) : (
                "Login"
              )}
            </motion.button>

            <motion.div
              variants={inputVariants}
              custom={3}
              className="text-center text-sm"
            >
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-red-600 hover:text-red-800 transition duration-300"
                disabled={loading}
              >
                Forgot password?
              </button>
            </motion.div>

            <motion.div
              variants={inputVariants}
              custom={4}
              className="text-center text-sm text-gray-700"
            >
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-bold text-blue-600 hover:text-blue-800 transition duration-300"
                disabled={loading}
              >
                Register
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;