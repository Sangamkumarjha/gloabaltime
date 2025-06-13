import React from 'react';

const MyTeamTable = () => {
  const data = [
    { sNo: 1, level: 1, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
    { sNo: 2, level: 2, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
    { sNo: 3, level: 4, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
    { sNo: 4, level: 6, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
    { sNo: 5, level: 1, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
    { sNo: 6, level: 4, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
    { sNo: 7, level: 3, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
    { sNo: 8, level: 2, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
    { sNo: 9, level: 2, userId: '923943 (7)', referralId: 468936, uplineId: 580941, currentSlot: 1000 },
  ];

  return (
<div className="bg-black px-0 sm:px-4 py-6">
      {/* Header */}
      <div className="bg-white shadow-lg rounded-lg mb-4">
        <div className="flex items-center bg-[#146c7b] text-white p-3 rounded-t-lg relative">
          <h2 className="text-lg sm:text-xl font-bold absolute left-4">My Team</h2>
          <div className="flex-1 flex justify-center">
            <span className="bg-white text-[#146c7b] px-4 py-1 rounded font-bold shadow">
              My Team
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-[600px] w-full table-auto text-center text-sm sm:text-base">
          <thead className="bg-[#146c7b] text-white">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Referral ID</th>
              <th className="px-4 py-2">Upline ID</th>
              <th className="px-4 py-2">Current Slot</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-black">
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{row.sNo}</td>
                <td className="px-4 py-2">{row.level}</td>
                <td className="px-4 py-2">{row.userId}</td>
                <td className="px-4 py-2">{row.referralId}</td>
                <td className="px-4 py-2">{row.uplineId}</td>
                <td className="px-4 py-2">{row.currentSlot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeamTable;
