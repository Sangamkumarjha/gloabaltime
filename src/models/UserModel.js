import { getUserChildren, getUserProfile } from "../api/api";

// src/models/UserModel.js
class UserModel {
  constructor() {
    this.userData = null
  }

  

  getUserData() {
    return this.userData;
  }

  // In a real application, these methods would make API calls
  async fetchUserData() {
  try{
 const data=await getUserProfile();
//  const tryl =await getUserChildren();
//  console.log(tryl);
const UserID=data.userData.userId;
localStorage.setItem("UserID",UserID);
 console.log(data);
 this.userData = {
      id: data.userData.userId || 'ABC03576',
      userType:data.userData.userType ,
            adminIncome:data.userData.adminIncome ,

      name: data.userData.email || 'User Name',
      totalUsers: data.userData.totalUsersUnder,
      currentLevel: data.userData.level || 5000,
      currentMatrix: data.userData.package || 'Not Eligible',
      directAssociates: data.userData.directAssociates || 31,
      latestLevel: {
        level: data.userData.level || 5,
        upgradeLevel:data.userData.level + 1,
        price: data.userData.income.levelIncome || 1000,
      },
      buyMatrix: {
        type: data.userData.buyMatrix?.type || 'Royal',
        price: data.userData.buyMatrix?.price || 1000,
      },
      referralIncome: data.userData.income.sponsorIncome || 0,
      sponsorIncome: data.userData.income.sponsorIncome ,
      levelCommunity: data.userData.package || 'Not Eligible',
      matrixReferral: data.userData.income.matrixReferral || 31,
      matrixUpgrade: data.userData.income.matrixUpgrade || 3140,
      myEarning: data.userData.income.totalIncome ,
      placementUpline: data.userData.placementUpline || 'Not Eligible',
      matrixIncome: data.userData.income.matrixIncome || 31,
      referralLink: data.userData.referralLink || 'https://abcdjjj.in/egister/AB4',
      contractAddress: data.userData.contractAddress || 'https://abcdjjj.in/egister/AB4',
    };
  }
  catch(error){
    console.error("Error fetching user data:", error);}

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.userData);
      }, 300);
    });
  }

  async updateUserData(newData) {
    return new Promise((resolve) => {
      this.userData = { ...this.userData, ...newData };
      setTimeout(() => {
        resolve(this.userData);
      }, 300);
    });
  }
}

export default new UserModel();