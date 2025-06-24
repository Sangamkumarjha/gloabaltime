import { useState, useEffect } from 'react';
import DashboardController from '../../controllers/DashboardController';
import { upgradeLevel } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Leveltest({ onUpgradeSuccess }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowPopup(false);
    navigate('/recharge');
  };

  // Fetch dashboard data
  const fetchData = async () => {
    try {
      const data = await DashboardController.getDashboardData();
      setDashboardData(data);
      console.log("Fetched dashboard data:", data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setMessage({ type: 'error', text: 'Failed to load dashboard data' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const level = dashboardData?.levels?.latestLevel;

const handleLevel = async () => {
setShowPopup(true); 
 
  // setIsLoading(true);
  // setMessage(null);

  // try {
  //   const response = await upgradeLevel(level);

  //   if (response?.status === "success") {
  //     await fetchData();
  //     onUpgradeSuccess?.(); // Notify dashboard
  //     setMessage({
  //       type: "success",
  //       text: response.message || `Successfully upgraded to level ${level }!`,
  //     });
  //   } else {
  //     // If API responds with status: 'failed'
  //     throw new Error(response.message || "Upgrade failed.");
  //   }
  // } catch (error) {
  //   console.error("Error upgrading level:", error);

  //   // Show detailed message if backend returned it
  //   const backendMessage =
  //     error?.response?.data?.message || error.message || "Failed to upgrade level";

  //   setMessage({ type: "error", text: backendMessage });
  // } finally {
  //   setIsLoading(false);
  // }
};


  const handleCloseMessage = () => {
    setMessage(null);
  };

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-300 ${message ? 'backdrop-blur-sm' : ''}`}>
      <button
        onClick={handleLevel}
disabled={isLoading || level >= 9}
        className={`relative text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl ${
          isLoading || level >= 9  ? 'pointer-events-none' : 'hover:pointer'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Upgrading...
          </div>
        ) : (
          `Upgrade To Level ${level }`
        )}
      </button>
              {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg w-80 space-y-4">
              <h3 className="text-lg font-semibold text-center">Confirm Recharge</h3>
              <p className="text-sm text-center">
                Are you sure you have sent TRX to the address?
              </p>
              <div className="flex justify-center space-x-4 pt-2">
                <button
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
 
      {message && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-30"></div>
          <div className={`relative p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-fadeIn ${
            message.type === 'success' ? 'bg-green-50 border-2 border-green-500 text-green-800' : 'bg-red-50 border-2 border-red-500 text-red-800'
          }`}>
            <div className="flex flex-col items-center">
              <p className="text-center font-semibold text-lg mb-4">{message.text}</p>
              <button
                onClick={handleCloseMessage}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none transition-colors duration-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leveltest;