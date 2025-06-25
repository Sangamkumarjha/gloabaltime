import React from 'react';
import { FaRegCopy } from 'react-icons/fa';

const RechargeSection = () => {
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
                src="https://cryptologos.cc/logos/tether-trx-logo.png" // Or use your own icon
                alt="TRX"
                className="w-8 h-8"
              />
              <span className="text-white font-medium">TRX</span>
            </div>
            <div className="w-40 h-40 bg-white p-2 rounded">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=sangam"
                alt="QR Code"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right: Wallet Address */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-lg font-semibold">Address</h2>
            <div className="flex items-center bg-gray-800 px-4 py-2 rounded-md">
              <span className="text-sm font-mono">0xt227...705a</span>
              <FaRegCopy className="ml-2 cursor-pointer hover:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Button + Note */}
        <div className="mt-8 flex flex-col items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full mb-4">
            Recharge Complete
          </button>
          <div className="text-sm text-gray-300 text-center space-y-1">
            <p>1. Copy the address above or scan the QR code and select TRX network to deposit TRX</p>
            <p>2. Please do not recharge other non-TRX or trx Assets .</p>
            <p>3. If it does not arrive for a long time, refresh the page or contact customer service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargeSection;
