import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../api/api';

const MyReferral = () => {
  const [referralData, setReferralData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const profile = await getUserProfile();
        console.log(profile);
        const referrals=profile.userData.referrals;
        
                  console.log(referrals);

        if (profile && profile.userData.referrals) {
          console.log(referrals);
          const formatted = referrals.map((ref, index) => ({
            id: index + 1,
            userId: ref || "N/A",
            regDate: ref.createdAt
              ? new Date(ref.createdAt).toLocaleString()
              : "12-02-2025",
          }));
          setReferralData(formatted);
        } else {
          setReferralData([]);
        }
      } catch (error) {
        console.error("Failed to fetch referral data:", error);
        setReferralData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);




  return (
    <div className="bg-black px-0 sm:px-4 sm:py-6 py-0">
      <div className="bg-white shadow-lg rounded-lg mb-4">
        {/* Header */}
        <div className="flex items-center bg-[#146c7b] text-white p-3 rounded-t-lg relative">
          <h2 className="text-lg sm:text-xl font-bold absolute left-4">My Team</h2>
          <div className="flex-1 flex justify-center">
            <span className="bg-white text-[#146c7b] px-4 py-1 rounded font-bold shadow">
              My Referral
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : referralData.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No referral data found.</div>
        ) : (
          <table className="min-w-[500px] w-full text-sm sm:text-base text-left border-collapse">
            <thead className="bg-[#146c7b] text-white">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {referralData.map((referral) => (
                <tr key={referral.id} className="border-b text-black hover:bg-gray-100">
                  <td className="px-4 py-2">{referral.id}</td>
                  <td className="px-4 py-2">{referral.userId}</td>
                  <td className="px-4 py-2">{referral.regDate}  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyReferral;

