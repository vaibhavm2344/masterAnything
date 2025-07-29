import React, { useContext } from 'react';
import { AppContext } from '../../context/userContext';

const Profile = () => {
  const { user, logOut } = useContext(AppContext);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-zinc-700 p-8 rounded-lg shadow-lg max-w-md w-full mb-45" >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Profile</h1>
        
        {user ? (
          <div className="space-y-4">
            <div className="bg-zinc-600 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-2">User Information</h2>
              <p className="text-gray-300">
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Email:</span> {user.email || 'Not provided'}
              </p>
            </div>
            
            <button
              onClick={logOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-300 mb-4">Please login to view your profile</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
