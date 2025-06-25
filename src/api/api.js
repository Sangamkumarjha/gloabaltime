import axios from "axios";
import { parseUnits, formatUnits } from "viem/utils";

const API = "https://gloablcalc-uc5h.onrender.com/api/v1/globaltime";
const BLOCKHAINAPI = "https://gloablcalc-uc5h.onrender.com/api/v1/globaltime";

export const login = async (Credential) => {
  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Credential),
    });
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const addMember = async ({ email, password, sponsorId }) => {
  try {
    const response = await axios.post(
      `${API}/user/register?sponsor=${sponsorId}`,
      {
        email,
        password,
      }
    );
    return response.data; // or return response if you prefer full object
  } catch (error) {
    console.error("API error during addMember:", error);
    throw error.response?.data || { message: "Unknown error occurred" };
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await fetch(`${API}/getuser/bytoken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserChildren = async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }
  if (!userId) {
    throw new Error("No user ID provided");
  }
  try {
    const response = await fetch(`${API}/binarystructure/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user children:", error);
    throw error;
  }
};

export const upgradeLevel = async (level1) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }
  if (!level1) {
    throw new Error("No user ID provided");
  }
  try {
    const response = await fetch(`${API}/upgrade/user?level=${level1}`, {
      method: "PUT",
      headers: {
        "Content-type": "Application/json",
        Authorization: `${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Upgrade failed.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching user children:", error);
    throw error;
  }
};

export const upgradeBronzLevel = async (pack) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await fetch(`${API}/upgrade/user?level=${pack}`, {
      method: "PUT",
      headers: {
        "Content-type": "Application/json",
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Upgrade failed.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching user children:", error);
    throw error;
  }
};

export const confirmTransaction = async (amount) => {
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    throw new Error("Invalid amount. Must be a positive number.");
  }

  const amountInSun = parseUnits(amount.toString(), 6); // 💡 "6" = decimals for TRX
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await fetch(`${BLOCKHAINAPI}/transaction/deposit`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ amount: amountInSun.toString() }), // ✅ wrap it in object
    });
    return await response.json();
  } catch (error) {
    console.error("confirmTransaction error:", error);
    throw error;
  }
};


// api.js
export const ConfirmRecharge = async (txId, level) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API}/transaction/deposit/confirmed?txId=${txId}&level%20=level${level}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Recharge confirmation (level) failed");
    }

    return await response.json();
  } catch (error) {
    console.error("ConfirmRecharge error:", error);
    throw error;
  }
};

// api.js
export const ConfirmRechargePack = async (txId, pack) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API}/transaction/deposit/confirmed?txId=${txId}&pack=${encodeURIComponent(pack)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Recharge confirmation (pack) failed");
    }

    return await response.json();
  } catch (error) {
    console.error("ConfirmRechargePack error:", error);
    throw error;
  }
};
