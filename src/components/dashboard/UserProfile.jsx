import React from 'react';

const UserProfile = ({ userData }) => {
  return (
    <div className="flex items-center">
      <div className="h-20 w-20 rounded-full overflow-hidden">
        <img 
          src="https://i.pravatar.cc/100/" 
          alt={userData.name} 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="ml-4">
        <h2 className="text-2xl font-bold">Hello {userData.name}</h2>
        <p className="text-gray-300">({userData.address})</p>
        <p className="text-gray-300">It is good to see you again!</p>
      </div>
    </div>
  );
};

export default UserProfile;