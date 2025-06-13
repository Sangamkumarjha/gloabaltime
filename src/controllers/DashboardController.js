// src/controllers/DashboardController.js
import UserModel from '../models/UserModel';

class DashboardController {
  async getDashboardData() {
    try {
      const userData = await UserModel.fetchUserData();
      
      // Format the data specifically for the dashboard
      return {
        userInfo: {
          id: userData.id,
          name: userData.name,
          userType:userData.userType,
          adminIncome:userData.adminIncome
        },
        stats: {
          totalUsers: userData.totalUsers,
          currentLevel: userData.currentLevel,
          currentMatrix: userData.currentMatrix,
          directAssociates: userData.directAssociates,
        },
        levels: {
          latestLevel: userData.latestLevel.upgradeLevel,
          latestLevel1:userData.latestLevel.level,
          buyMatrix: userData.buyMatrix,
        },
        wallet: {
          referralIncome: userData.referralIncome,
          sponsorIncome: userData.sponsorIncome,
          levelCommunity: userData.levelCommunity,
          matrixReferral: userData.matrixReferral,
          matrixUpgrade: userData.matrixUpgrade,
          myEarning: userData.myEarning,
          placementUpline: userData.placementUpline,
          matrixIncome: userData.matrixIncome,
        },
        links: {
          referralLink: userData.referralLink,
          contractAddress: userData.contractAddress,
        }
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }
}

export default new DashboardController();