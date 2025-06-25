import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardController from "../../controllers/DashboardController";
import { confirmTransaction } from "../../api/api"; // ⬅️ use same API from Leveltest

function LevelBronzeUpgrade({ onUpgradeSuccess }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [message, setMessage] = useState(null);
  const [lastUpgrade, setLastUpgrade] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [pendingPack, setPendingPack] = useState(null);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 🧠 Level details
  const getLevelDetails = (level) => {
    const levelMap = {
      3: { pack: "bronze", display: "Bronze", amount: 40 },
      4: { pack: "silver", display: "Silver", amount: 100 },
      5: { pack: "gold", display: "Gold", amount: 200 },
      6: { pack: "platinum", display: "Platinum", amount: 500 },
      7: { pack: "diamond", display: "Diamond", amount: 2000 },
      8: { pack: "blue diamond", display: "Blue Diamond", amount: 4000 },
    };
    return levelMap[level] || null;
  };

  const fetchData = async () => {
    try {
      const data = await DashboardController.getDashboardData();
      setDashboardData(data);
      setCurrentLevel(data?.levels?.latestLevel1 || 0);
      setLastUpgrade(data?.stats?.currentMatrix || "");
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to fetch data" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🚀 Trigger upgrade flow
  const handleUpgradeClick = async () => {
    try {
      const freshData = await DashboardController.getDashboardData();
      const freshLevel = freshData?.levels?.latestLevel1 || 0;
      const matrix = freshData?.stats?.currentMatrix || "";

      if (matrix === "blue diamond") {
        throw new Error("You are already at the maximum level.");
      } else if (freshLevel < 2) {
        throw new Error("You must reach at least level 2 to continue.");
      }

      const nextLevelDetails = getLevelDetails(freshLevel);
      if (!nextLevelDetails) {
        throw new Error("Upgrade level not available.");
      }

      setPendingPack(nextLevelDetails);
      setRequiredAmount(nextLevelDetails.amount);
      setShowPopup(true);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  // ✅ Call confirmTransaction & navigate
  const handleConfirmUpgrade = async () => {
    setIsLoading(true);
    setShowPopup(false);

    try {
      const trxAmount = requiredAmount.toString(); // make sure it's string
      const result = await confirmTransaction(trxAmount); // API call

      if (!result?.txId) {
        throw new Error("Transaction ID not received from backend.");
      }

      // ✅ Navigate to /recharge with txId and pack
      navigate(`/recharge`, {
        state: {
          txId: result.txId,
          pack: pendingPack.pack,
        },
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Transaction failed" });
    } finally {
      setIsLoading(false);
      setPendingPack(null);
    }
  };

  const handleCloseMessage = () => setMessage(null);

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-t-4 border-b-2 border-blue-500 rounded-full" />
      </div>
    );
  }

  const levelDetails = getLevelDetails(currentLevel);

  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-300 ${message ? 'backdrop-blur-sm' : ''}`}>
      {/* 🔘 Upgrade Button */}
      <button
        onClick={handleUpgradeClick}
        disabled={isLoading || lastUpgrade === "blue diamond"}
        className={`text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 focus:outline-none shadow-lg ${
          isLoading || lastUpgrade === "blue diamond" ? "opacity-50 cursor-not-allowed" : "hover: "
        }`}
      >
        {isLoading ? "Upgrading..." : lastUpgrade === "blue diamond" ? "Fully Upgraded" : `Upgrade to ${levelDetails?.display || "Next"} Level`}
      </button>

      {/* ✅ Popup */}
      {showPopup && pendingPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white text-black p-6 rounded-lg w-80 space-y-4">
            <h3 className="text-lg font-semibold text-center">Confirm Upgrade</h3>
            <p className="text-sm text-center">
              Upgrade to <strong>{pendingPack.display}</strong> for <strong>{requiredAmount} TRX</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowPopup(false);
                  setPendingPack(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleConfirmUpgrade}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Message Box */}
      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur" />
          <div className={`relative p-6 rounded-lg shadow-2xl max-w-md bg-white text-center ${message.type === 'success' ? 'border-green-500 text-green-800' : 'border-red-500 text-red-800'} border-2`}>
            <p className="font-semibold">{message.text}</p>
            <button
              onClick={handleCloseMessage}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LevelBronzeUpgrade;
