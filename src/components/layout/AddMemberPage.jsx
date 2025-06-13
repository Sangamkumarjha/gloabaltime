import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addMember } from "../../api/api";
import registerImage from "../../assets/loginImage.svg";

// Extract query params
const useQuery = () => new URLSearchParams(useLocation().search);

const AddMemberPage = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sponsorId, setSponsorId] = useState(""); // still needed internally
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sponsorFromURL = query.get("sponsor");
    if (sponsorFromURL) {
      setSponsorId(sponsorFromURL);
    }
  }, [query]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await addMember({ email, password, sponsorId });
  console.log(response);
      if (response.success || response.status === "success") {
        navigate("/");
      } else {
        setError(response.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-200">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-teal-700 rounded-2xl lg:rounded-r-none"
      >
        <img src={registerImage} alt="Registration" className="w-full max-w-md" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full lg:w-1/2 p-6 bg-white rounded-2xl lg:rounded-l-none shadow-xl"
      >
        <form onSubmit={handleAddMember} className="space-y-5 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

          {/* Sponsor ID is not shown, only used internally */}

{/* Email */}
<div className="relative">
  <input
    type="email"
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    disabled={isLoading}
    className="peer w-full appearance-none border border-gray-300 rounded-md bg-white px-4 pt-6 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    placeholder="Your email"
  />
  <label
    htmlFor="email"
    className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
  >
    Email
  </label>
</div>

{/* Password */}
<div className="relative">
  <input
    type="password"
    id="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    disabled={isLoading}
    placeholder=" "
    className="peer w-full appearance-none border border-gray-300 rounded-md bg-white px-4 pt-6 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
  />
  <label
    htmlFor="password"
    className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
  >
    Password
  </label>
</div>


          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button
            type="submit"
            className={`w-full p-3 rounded-lg text-white font-medium ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-700">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 font-bold"
            >
              Login
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default AddMemberPage;
