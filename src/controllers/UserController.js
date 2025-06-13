// src/controllers/UserController.js
import UserModel from '../models/UserModel';

class UserController {
  async getUserProfile() {
    try {
      const userData = await UserModel.fetchUserData();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  async updateUserProfile(userData) {
    try {
      const updatedData = await UserModel.updateUserData(userData);
      return updatedData;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy text:', error);
      return false;
    }
  }
}

export default new UserController();