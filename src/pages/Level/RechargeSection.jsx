import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { ConfirmRecharge, ConfirmRechargePack } from "../../api/api";
import DashboardController from "../../controllers/DashboardController";

const RechargeSection = () => {
  const location = useLocation();
  const { txId, nextLevel, pendingPack } = location.state || {}; // Accept txId, nextLevel, and pack
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [showStatusPage, setShowStatusPage] = useState(false);
  const [address, setAddress] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(address);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};


  useEffect(() => {
    const result = async () => {
      const initialData = await DashboardController.getDashboardData();
      console.log("initialData======", initialData);
      setAddress(initialData.wallet.address);
    };
    result();
  }, []);
  const ScannerApi = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${address}`;

  const handleRecharge = async () => {
    setLoading(true);
    setMessage(null);
    setShowStatusPage(true);

    try {
      const initialData = await DashboardController.getDashboardData();
      console.log("initialData======", initialData);
      setAddress(initialData.wallet.address);

      const initialLevel = initialData?.levels?.latestLevel1;
      const initialMatrix = initialData?.stats?.currentMatrix;

      // Initial Confirm API hit
      if (pendingPack) {
        await ConfirmRechargePack(txId, pendingPack);
      } else if (nextLevel) {
        await ConfirmRecharge(txId, nextLevel);
      }

      const checkUpgrade = async () => {
        const currentData = await DashboardController.getDashboardData();
        const newLevel = currentData?.levels?.latestLevel1;
        const newMatrix = currentData?.stats?.currentMatrix;

        const levelChanged = nextLevel && newLevel > initialLevel;
        const matrixChanged = pendingPack && newMatrix !== initialMatrix;

        if (levelChanged || matrixChanged) {
          setMessage("✅ Recharge confirmed successfully!");
          setLoading(false);
          return true;
        }
        return false;
      };

      let elapsed = 0;
      const pollInterval = 10000; // 10 seconds
      const maxDuration = 600000; // 10 minutes

      const poller = setInterval(async () => {
        elapsed += pollInterval;
        const isConfirmed = await checkUpgrade();
        if (isConfirmed || elapsed >= maxDuration) {
          clearInterval(poller);
          if (!isConfirmed) {
            setMessage(
              "⚠️ Recharge not confirmed within 10 minutes. Please try again."
            );
            setLoading(false);
          }
        }
      }, pollInterval);
    } catch (error) {
      console.error(error);
      setMessage("❌ Error confirming recharge.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (countdown > 0 && loading) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, loading]);

  if (showStatusPage && loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-[#1a1a1a] rounded-xl shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-green-400">
            🔄 Waiting for Confirmation
          </h2>
          <p className="mb-2 text-gray-300">
            Please do not refresh or close this page.
          </p>
          <p className="mb-4 text-gray-400">
            We are confirming your recharge. This may take up to 10 minutes.
          </p>
          <p className="text-blue-400">
            ⏳ Time left:{" "}
            <strong>
              {Math.floor(countdown / 60)}:
              {String(countdown % 60).padStart(2, "0")}
            </strong>
          </p>
          {txId && (
            <div className="mt-4 text-sm text-gray-500">
              <p>
                Txn ID:{" "}
                <span className="font-mono break-all text-green-500">
                  {txId}
                </span>
              </p>
              {nextLevel && <p>Level: {nextLevel}</p>}
              {pendingPack && <p>Pack: {pendingPack}</p>}
            </div>
          )}
          {message && <p className="mt-4 text-green-400">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-[#1a1a1a] rounded-xl shadow-lg p-6 w-full max-w-3xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left: Network Info + QR */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg font-semibold">Select Mainnet</h2>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/tron-trx-7152138-5795294.png"
                alt="TRX"
                className="w-8 h-8"
              />
              <span className="text-white font-medium">TRX</span>
            </div>
            <div className="w-40 h-40 bg-white p-2 rounded">
              <img src={ScannerApi} alt="QR Code" className="w-full h-full" />
            </div>
          </div>

          {/* Right: Wallet Address */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg font-semibold">Address</h2>
<div className="flex items-center bg-gray-800 px-4 py-2 rounded-md">
  <span className="text-sm font-mono">
    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '—'}
  </span>
  <FaRegCopy
    onClick={handleCopy}
    className="ml-2 cursor-pointer hover:text-gray-400"
    title="Copy Address"
  />
  {copySuccess && (
    <span className="ml-2 text-green-400 text-xs animate-pulse">Copied!</span>
  )}
</div>

          </div>
        </div>

        {/* Transaction Info */}
        {txId && (
          <div className="mt-6 text-center">
            <p className="text-green-400">
              ✅ Transaction ID: <span className="font-mono">{txId}</span>
            </p>
            {nextLevel && (
              <p className="text-blue-400 mt-1">
                🎯 Target Level: <strong>{nextLevel}</strong>
              </p>
            )}
            {pendingPack && (
              <p className="text-yellow-400 mt-1">
                🎯 Target Pack: <strong>{pendingPack}</strong>
              </p>
            )}
          </div>
        )}

        {/* Button + Note */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={handleRecharge}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full mb-4"
          >
            Recharge Complete
          </button>
          <div className="text-sm text-gray-300 text-center space-y-1">
            <p>
              1. Copy the address above or scan the QR code and select TRX
              network to deposit TRX
            </p>
            <p>2. Please do not recharge other non-TRX or trx Assets.</p>
            <p>
              3. If it does not arrive for a long time, refresh the page or
              contact customer service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeSection;
