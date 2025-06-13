import React from "react";
import { FaSearch, FaUsers, FaChartLine, FaSitemap, FaWallet, FaMoneyBillWave } from "react-icons/fa";

const GlobaltimeDashboard = () => {
  // Copy link function
  const handleCopyLink = (text) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
            <img src="/src/assets/logo.png" alt="Global Time" className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to Globaltime</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-white rounded-full pl-4 pr-10 py-2 text-black w-64"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-600" />
          </div>
          <button className="bg-primary hover:bg-secondary px-6 py-2 rounded-md">
            Login
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-800 py-4">
        <ul className="flex justify-center space-x-12">
          <li className="text-lg font-medium">My Team</li>
          <li className="text-lg font-medium">Level</li>
          <li className="text-lg font-medium">Matrix</li>
          <li className="text-lg font-medium">My Income</li>
          <li className="text-lg font-medium">Download Plan</li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Profile and Links */}
        <div className="flex justify-between items-start mb-8">
          {/* User Profile */}
          <div className="flex items-center">
            <div className="h-20 w-20 bg-gray-300 rounded-full overflow-hidden">
              <img 
                src="/src/assets/avatar.png" 
                alt="User"
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">Hello User Name</h2>
              <p className="text-gray-400">(ABC03576)</p>
              <p>It is good to see you again!</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <div className="bg-primary p-4 rounded-lg w-72">
              <h3 className="text-xl font-bold mb-2">Referral Link</h3>
              <p className="mb-2 text-sm truncate">https://abcdjjj.in/egister/AB4</p>
              <button 
                onClick={() => handleCopyLink("https://abcdjjj.in/egister/AB4")}
                className="bg-white text-primary px-4 py-1 rounded-md text-sm"
              >
                Copy Link
              </button>
            </div>
            <div className="bg-primary p-4 rounded-lg w-72">
              <h3 className="text-xl font-bold mb-2">Contract Address</h3>
              <p className="mb-2 text-sm truncate">https://abcdjjj.in/egister/AB4</p>
              <button 
                onClick={() => handleCopyLink("https://abcdjjj.in/egister/AB4")}
                className="bg-white text-primary px-4 py-1 rounded-md text-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaUsers className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Total User</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              3140
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaChartLine className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Current Level</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              5000
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaChartLine className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Current Matrix</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              Gold
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaUsers className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Direct Associate</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              31
            </div>
          </div>
        </div>

        {/* Stats Cards - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaChartLine className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Lastest Level</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              Level 5: $1000
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaChartLine className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Buy Matrix</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              Royal: $1000
            </div>
          </div>
        </div>

        {/* Wallet Overview */}
        <h2 className="text-2xl font-bold mb-6">Wallet Overview</h2>
        
        {/* Wallet Cards - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaWallet className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Referral Income</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              3140
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaMoneyBillWave className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Sponsor Income</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              5000
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaUsers className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Level Community</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              Gold
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaSitemap className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Matrix Referral</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              31
            </div>
          </div>
        </div>

        {/* Wallet Cards - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaChartLine className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Matrix Upgrade</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              3140
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaMoneyBillWave className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">My Earning</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              5000
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaUsers className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Placement Upline</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              Gold
            </div>
          </div>
          
          <div className="bg-white text-black rounded-lg p-4">
            <div className="flex items-center mb-2">
              <FaSitemap className="text-primary text-xl mr-2" />
              <h3 className="text-lg font-bold">Matrix Income</h3>
            </div>
            <div className="bg-primary text-white text-center py-2 rounded-md font-bold">
              31
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlobaltimeDashboard;