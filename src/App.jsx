import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DownloadPlan from "./pages/DownloadPlan";
import GlobaltimeDashboard from "./components/GloabletimeDasboard";
import "./App.css";
import MyReferral from "./pages/MyTeam/MyReferral";
import MyTeamTable from "./pages/MyTeam/MyTeam";
import MyTree from "./pages/MyTeam/MyTree";
import SmartMatrix from "./pages/Matrix/SmartMatrix";
import SilverMatrix from "./pages/Matrix/SilverMatrix";
import MatrixIncome from "./pages/MyIncome/MatrixIncome";
import GoldMatrix from "./pages/Matrix/GoldMatrix";
import DiamondMatrix from "./pages/Matrix/DiamondMatrix";
import RoyalMatrix from "./pages/Matrix/RoyalMatrix";
import CrownMatrix from "./pages/Matrix/CrownMatrix";
import LevelIncome from "./pages/MyIncome/LevelIncome";
import MatrixReferralIncome from "./pages/MyIncome/MatrixReferralIncome";
import PlacementUplineIncome from "./pages/MyIncome/PlacementIncome";
import ReferralIncome from "./pages/MyIncome/ReferralIncome";
import SponsorIncome from "./pages/MyIncome/SponsorIncome";
import Layout from "./components/layout/Layout";
import LoginPage from "./components/layout/LoginPage";
import AddMemberPage from "./components/layout/AddMemberPage";
import PrivateRoute from "./components/PrivateRoute"; // Import this
import Leveltest from "./pages/Level/Leveltest";
import {jwtDecode} from 'jwt-decode';

function App() {


const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decoded.exp < currentTime;
  } catch (err) {
    return true; // treat invalid token as expired
  }
};
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    // Remove user session and redirect to login
    localStorage.removeItem("authToken");
    navigate("/login");
  }
}, []);


  return (
    <div className="app min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<AddMemberPage />} />

          {/* Protected Routes */}
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/download-plan" element={<DownloadPlan />} />
            <Route path="/my-team" element={<MyTeamTable />} />
            <Route path="/my-referral" element={<MyReferral />} />
            <Route path="/my-tree" element={<MyTree />} />

            <Route path="/matrix">
              <Route path="smart" element={<SmartMatrix />} />
              <Route path="silver" element={<SilverMatrix />} />
              <Route path="gold" element={<GoldMatrix />} />
              <Route path="royal" element={<RoyalMatrix />} />
              <Route path="diamond" element={<DiamondMatrix />} />
              <Route path="crown" element={<CrownMatrix />} />
            </Route>

            <Route path="/my-income">
              <Route path="level" element={<LevelIncome />} />
              <Route path="matrix" element={<MatrixIncome />} />
              <Route path="matrix-referral" element={<MatrixReferralIncome />} />
              <Route path="placement" element={<PlacementUplineIncome />} />
              <Route path="referral" element={<ReferralIncome />} />
              <Route path="sponsor" element={<SponsorIncome />} />
            </Route>
            

            <Route path="/level">
              {/* {Array.from({ length: 8 }, (_, i) => (
                <Route
                  key={i + 1}
                  path={`${i + 1}`}
                  element={
                    <div className="mt-24">
                      Level {i + 1} Page - This section is under development.
                    </div>
                  }
                />
                
              ))} */}
              <Route path="level1" element={<Leveltest/>}/>
            </Route>
          </Route>

          {/* Optional: Protect GlobaltimeDashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <GlobaltimeDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
