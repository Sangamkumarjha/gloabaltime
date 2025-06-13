import React from 'react';
import { FaUserFriends, FaChartLine, FaUsers, FaSitemap } from 'react-icons/fa';

const DashboardCard = ({ icon, title, value, color = 'primary' }) => {
  const Icon = icon;
const formattedValue =
  typeof value === 'number'
    ? Number(value).toFixed(2)
    : typeof value === 'string'
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : value;


  
  return (
    <div className="bg-white rounded-lg p-4 text-black shadow-lg">
      <div className="flex items-center mb-2 justify-center">
        <Icon className="text-primary text-2xl mr-2" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className={`bg-[#146c7b] text-white text-center py-2 px-4 rounded-md font-bold text-xl`}>
        {formattedValue}
      </div>
    </div>
  );
};

export default DashboardCard;