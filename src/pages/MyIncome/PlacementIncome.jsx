import React from "react";

export default function PlacementUplineIncome() {
  const incomeData = Array.from({ length: 9 }, (_, i) => ({
    sno: i + 1,
    date: "07-03-2024",
    income: 9,
    fromUser: 680948,
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto">
          <div className='bg-white shadow-lg rounded-lg p-4 mb-2 w-full'>
          <div className="flex items-center bg-[#146c7b] text-white p-2 rounded-t-lg relative">
            <h2 className="text-2xl font-bold absolute left-4">My Income</h2>
            <div className="flex-1 flex justify-center">
              <span className="bg-white text-black text-2xl px-4 py-1 rounded font-bold shadow">
                Placement Upline Income
              </span>
            </div>
          </div>
          </div>
      <div className="bg-white shadow-md rounded-b-lg overflow-hidden">

        <table className="min-w-full text-sm text-left text-[#146c7b]">
          <thead className="bg-[#146c7b] text-white">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Income</th>
              <th className="px-6 py-3">From User</th>
              <th className="px-6 py-3">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {incomeData.map((item) => (
              <tr key={item.sno} className="even:bg-gray-100 text-black">
                <td className="px-6 py-1">{item.sno}</td>
                <td className="px-6 py-1">{item.date}</td>
                <td className="px-6 py-1">{item.income}</td>
                <td className="px-6 py-1">{item.fromUser}</td>
                <td className="px-6 py-1">
                  <button className="bg-[#146c7b] text-white px-4 py-2 rounded hover:bg-teal-800">
                    Transaction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
