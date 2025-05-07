import { Mail, User, Edit, X } from "lucide-react";
import ProfileAvatar from "../components/ProfileAvatar";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import profileSeeds from "../lib/profileSeeds";


const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState(authUser?.profilePic);

  const handleAvatarSelect = async (seed: string) => {
    setSelectedSeed(seed);
    try {
      await updateProfile(seed);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
    setIsAvatarModalOpen(false);
  };

  return (
    <div className="h-screen pt-20 bg-gray-900">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-gray-800 rounded-xl p-6 space-y-8">
      
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white">Profile</h1>
            <p className="mt-2 text-gray-400">Your profile information</p>
          </div>

          {/* Avatar section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <ProfileAvatar seed={selectedSeed} size={180} />
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors"
                disabled={isUpdatingProfile}
              >
                <Edit className="w-4 h-4 text-white" />
              </button>
            </div>
            {isUpdatingProfile && (
              <span className="text-sm text-blue-400">Updating avatar...</span>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 text-white">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 text-white">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-medium text-white mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white">{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
          <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 border border-gray-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                Choose your avatar
              </h3>
              <button 
                onClick={() => setIsAvatarModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {profileSeeds.map((seed) => (
                <button
                  key={seed}
                  onClick={() => handleAvatarSelect(seed)}
                  className={`p-2 rounded-lg transition-all ${
                    selectedSeed === seed 
                      ? 'ring-2 ring-blue-500 bg-gray-700' 
                      : 'hover:bg-gray-700'
                  }`}
                  disabled={isUpdatingProfile}
                >
                  <ProfileAvatar seed={seed} size={80} />
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
                disabled={isUpdatingProfile}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;