import { Mail, User, Edit, X } from "lucide-react";
import ProfileAvatar from "../components/ProfileAvatar";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import profileSeeds from "../lib/profileSeeds";


const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState(authUser? authUser?.profilePic:"");

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
    <div className="h-max pt-20 bg-base-100">
  <div className="max-w-2xl mx-auto p-4 py-8">
    <div className="bg-base-200 rounded-xl p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="mt-2 text-base-content/70">Your profile information</p>
      </div>

      {/* Avatar section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <ProfileAvatar seed={selectedSeed} size={180} />
          <button
            onClick={() => setIsAvatarModalOpen(true)}
            className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 hover:bg-primary-focus transition-colors"
            disabled={isUpdatingProfile}
          >
            <Edit className="w-4 h-4 text-primary-content" />
          </button>
        </div>
        {isUpdatingProfile && (
          <span className="text-sm text-info">Updating avatar...</span>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-1.5">
          <div className="text-sm text-base-content/70 flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </div>
          <p className="px-4 py-2.5 bg-base-300 rounded-lg border border-base-content/10">
            {authUser?.fullName}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="text-sm text-base-content/70 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </div>
          <p className="px-4 py-2.5 bg-base-300 rounded-lg border border-base-content/10">
            {authUser?.email}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-base-200 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-4">Account Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-base-content/10">
            <span className="text-base-content/70">Member Since</span>
            <span>{authUser?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-base-content/70">Account Status</span>
            <span className="text-success">Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Custom Modal */}
  {isAvatarModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="w-full max-w-md rounded-lg bg-base-200 p-6 border border-base-content/10 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            Choose your avatar
          </h3>
          <button 
            onClick={() => setIsAvatarModalOpen(false)}
            className="text-base-content/70 hover:text-base-content"
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
                  ? 'ring-2 ring-primary bg-base-300' 
                  : 'hover:bg-base-300'
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
            className="px-4 py-2 text-base-content/70 hover:text-base-content"
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