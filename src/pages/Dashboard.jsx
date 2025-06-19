import React, { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaChartLine,
  FaUsers,
  FaSitemap,
  FaWallet,
  FaMoneyBillWave,
} from "react-icons/fa";
import DashboardController from "../controllers/DashboardController";
import UserController from "../controllers/UserController";
import DashboardCard from "../components/dashboard/DashboardCard";
import LinkCard from "../components/dashboard/LinkCard";
import UserProfile from "../components/dashboard/UserProfile";
import Leveltest from "./Level/Leveltest";
import LevelBronzeUpgrade from "./Level/levelMatrixUpgrade";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // ⬅️ Add this
  const [admin, setAdmin] = useState(false);

  const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decoded.exp < currentTime;
  } catch (err) {
    return true; // treat invalid token as expired
  }
};

const navigate =useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    // Remove user session and redirect to login
    localStorage.removeItem("authToken");
    navigate("/login");
  }
}, []);

const fetchData = async () => {
  try {
    const data = await DashboardController.getDashboardData();
    setDashboardData(data);
    setAdmin(data?.userInfo?.userType === "admin"); // ✅ use `data`, not `dashboardData`
    setLoading(false);
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    setLoading(false);
  }
};


  useEffect(() => {
    fetchData();
  }, [refreshKey]); // ⬅️ Refresh when refreshKey changes

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1); // ⬅️ Manual trigger

  const handleCopyLink = async (link) => {
    const success = await UserController.copyToClipboard(link);
    if (success) {
      alert("Link copied to clipboard!");
    } else {
      alert("Failed to copy link.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!dashboardData) {
    return (
      <div className="text-center mt-10">Error loading dashboard data.</div>
    );
  }
  {
    /* Stats Overview Row */
  }

  return (
    <div className="container mx-auto px-0 mt-8 md:px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <UserProfile userData={dashboardData.userInfo} />

        <div className="flex flex-col sm:flex-col md:flex-row gap-4">
          <LinkCard
            title="Referral Link"
            link={dashboardData.links.referralLink}
            onCopy={handleCopyLink}
          />
          <LinkCard
            title="Contract Address"
            link={dashboardData.links.contractAddress}
            onCopy={handleCopyLink}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          icon={FaUserFriends}
          title="Total User"
          value={dashboardData.stats.totalUsers}
        />
        <DashboardCard
          icon={FaChartLine}
          title="Current Level"
          value={dashboardData.stats.currentLevel}
        />
        <DashboardCard
          icon={FaChartLine}
          title="Current Matrix"
          value={dashboardData.stats.currentMatrix}
        />
        {/* <DashboardCard 
          icon={FaUsers} 
          title="Direct Associate" 
          value={dashboardData.stats.directAssociates} 
        /> */}
      </div>

      {/* Latest Level & Buy Matrix Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* <DashboardCard 
          icon={FaChartLine} 
          title="Lastest Level" 
          value={`Level ${dashboardData.levels.latestLevel1}
          : $${dashboardData.levels.latestLevel.price}
          `} 
        /> */}
        {/* <DashboardCard 
          icon={FaChartLine} 
          title="Buy Matrix" 
          value={`${dashboardData.levels.buyMatrix.type}: $${dashboardData.levels.buyMatrix.price}`} 
        /> */}
        <DashboardCard
          icon={FaChartLine}
          title="Upgrade Level"
          value={<Leveltest onUpgradeSuccess={triggerRefresh} />}
        />
<DashboardCard
  icon={FaChartLine}
  title="Level Upgrade"
  value={<LevelBronzeUpgrade key={refreshKey} onUpgradeSuccess={triggerRefresh} />}
/>
      </div>

      <h2 className="text-2xl font-bold mb-6">Wallet Overview</h2>

      {/* Wallet Overview First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {admin ? (
          <DashboardCard
            icon={FaWallet}
            title="Admin Income"
            value={dashboardData.userInfo.adminIncome}
          />
        ) : (
          <DashboardCard
            icon={FaWallet}
            title="Referral Income"
            value={dashboardData.wallet.referralIncome}
          />
        )}
        {/* <DashboardCard 
          icon={FaWallet} 
          title="Referral Income" 
          value={dashboardData.wallet.referralIncome} 
        /> */}
        <DashboardCard
          icon={FaMoneyBillWave}
          title="Sponsor Income"
          value={dashboardData.wallet.sponsorIncome}
        />
        <DashboardCard
          icon={FaUsers}
          title="Level Community"
          value={dashboardData.wallet.levelCommunity}
        />
        {/* <DashboardCard 
          icon={FaSitemap} 
          title="Matrix Referral" 
          value={dashboardData.wallet.matrixReferral} 
        /> */}
      </div>

      {/* Wallet Overview Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* <DashboardCard 
          icon={FaChartLine} 
          title="Matrix Upgrade" 
          value={dashboardData.wallet.matrixUpgrade} 
        /> */}
        <DashboardCard
          icon={FaMoneyBillWave}
          title="My Earning"
          value={dashboardData.wallet.myEarning}
        />
        <DashboardCard
          icon={FaUsers}
          title="Placement Upline"
          value={dashboardData.wallet.placementUpline}
        />
        <DashboardCard
          icon={FaSitemap}
          title="Matrix Income"
          value={dashboardData.wallet.matrixIncome}
        />
      </div>
    </div>
  );
};

export default Dashboard;
