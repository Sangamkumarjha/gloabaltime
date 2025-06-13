import React from 'react';

const DiamondMatrix = () => {
  const data = [
    { sNo: 1, level: 1, userId: 150985, uplineId: 580941, date: '07-03-2024' },
    { sNo: 2, level: 3, userId: 150985, uplineId: 580941, date: '07-03-2024' },
    { sNo: 3, level: 5, userId: 150985, uplineId: 580941, date: '07-03-2024' },
    { sNo: 4, level: 6, userId: 150985, uplineId: 580941, date: '07-03-2024' },
    { sNo: 5, level: 2, userId: 150985, uplineId: 580941, date: '07-03-2024' },
    { sNo: 6, level: 4, userId: 150985, uplineId: 580941, date: '07-03-2024' },
    { sNo: 7, level: 2, userId: 150985, uplineId: 580941, date: '07-03-2024' },
    { sNo: 8, level: 1, userId: 150985, uplineId: 580941, date: '07-03-2024' },
    { sNo: 9, level: 2, userId: 150985, uplineId: 580941, date: '07-03-2024' },
  ];

  return (
    <div className="bg-black shadow-md rounded-lg overflow-hidden mx-4 my-6">
      {/* Title Header */}
          <div className='bg-white shadow-lg rounded-lg p-4 mb-2 w-full'>
          <div className="flex items-center bg-[#146c7b] text-white p-2 rounded-t-lg relative">
            <h2 className="text-2xl font-bold absolute left-4">Matrix</h2>
            <div className="flex-1 flex justify-center">
              <span className="bg-white text-black text-xl px-4 py-1 rounded font-bold shadow">
                Dimand Matrix
              </span>
            </div>
          </div>
          </div>

      {/* Table without outer border, with row dividers only */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-center">
          <thead className="bg-[#146c7b] text-white">
            <tr className="border-b border-blue-300">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Upline ID</th>
              <th className="px-4 py-2">Registration Date</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-300">
            {data.map((row, index) => (
              <tr key={index} className="bg-white text-black">
                <td className="px-4 py-2">{row.sNo}</td>
                <td className="px-4 py-2">{row.level}</td>
                <td className="px-4 py-2">{row.userId}</td>
                <td className="px-4 py-2">{row.uplineId}</td>
                <td className="px-4 py-2">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiamondMatrix;
