import React, { useState, useRef } from 'react';

// --- Icon Components ---
// Chevron Down Icon
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Generic user icon for default avatar
const UserCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Camera icon for edit overlay
const CameraIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Default data structure if no props are passed
const defaultProfileData = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    avatarUrl: "" // This will be the URL of the image from your server
};

// --- Account Page Component ---
// It now accepts 'initialProfileData' as a prop
function Userinfo({ initialProfileData }) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Use passed-in data or the default empty data
  const [profileData, setProfileData] = useState(initialProfileData || defaultProfileData);
  
  // Form data holds changes, including new password fields
  const [formData, setFormData] = useState({
      ...profileData,
      newPassword: "",
      confirmPassword: ""
  });
  
  // State for the temporary new avatar preview
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Update formData state as user types
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle new image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the preview
      setAvatarPreview(URL.createObjectURL(file));
      // In a real app, you might also store the file object itself
      // e.g., setFormData(prev => ({ ...prev, avatarFile: file }));
    }
  };

  // Handle saving changes
  const handleSave = (e) => {
    e.preventDefault();
    
    // In a real app, you would send `formData` (and the new avatar file) to your API here.
    // If a new password was entered, you'd send it too.
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        alert("New passwords do not match.");
        return;
    }
    
    // On success, update the "saved" profile data
    const updatedData = { ...formData };
    
    // If there's a new avatar preview, make it the "official" avatar URL
    // In a real app, this would be the URL returned from your backend upload
    if (avatarPreview) {
        updatedData.avatarUrl = avatarPreview;
    }

    // Clear password fields for security
    delete updatedData.newPassword;
    delete updatedData.confirmPassword;
    
    setProfileData(updatedData);
    setFormData(updatedData);
    setAvatarPreview(null); // Clear the preview
    setIsEditing(false); // Switch back to view mode
  };

  // Handle canceling changes
  const handleCancel = () => {
    setFormData({ // Revert changes back to saved data
        ...profileData, 
        newPassword: "", 
        confirmPassword: "" 
    });
    setAvatarPreview(null); // Clear any selected image preview
    setIsEditing(false); // Switch back to view mode
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account</h1>
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            {/* Display the avatar preview, or the saved avatar, or the default icon */}
            {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover" />
            ) : formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Profile Avatar" className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover" />
            ) : (
                <UserCircleIcon className="w-16 h-16 text-gray-300" />
            )}
            
            {/* Show Edit button overlay when in edit mode */}
            {isEditing && (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 w-full h-full bg-black bg-opacity-50 rounded-full flex flex-col items-center justify-center text-white text-xs font-medium opacity-0 hover:opacity-100 transition-opacity"
              >
                <CameraIcon className="w-6 h-6" />
                Change
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text" id="firstName" value={formData.firstName} onChange={handleChange}
                disabled={!isEditing}
                placeholder="Your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
            
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text" id="lastName" value={formData.lastName} onChange={handleChange}
                disabled={!isEditing}
                placeholder="Your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
            
            {/* Email */}
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email" id="email" value={formData.email} onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                {/* CheckIcon div removed */}
              </div>
            </div>
            
            {/* Contact Address */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Address
              </label>
              <input
                type="text" id="address" value={formData.address} onChange={handleChange}
                disabled={!isEditing}
                placeholder="123 Main St"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="e.g. Islamabad"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Province / State */}
            <div>
              <label htmlFor="provinceState" className="block text-sm font-medium text-gray-700 mb-1">
                Province / State
              </label>
              <div className="relative">
                <select
                  id="provinceState" // Changed id
                  value={formData.state} // It still maps to `formData.state`
                  onChange={(e) => handleChange({ target: { id: 'state', value: e.target.value } })} // Ensure it updates `state`
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="">{isEditing ? "Select Province / State" : formData.state || "N/A"}</option>
                  
                  <optgroup label="Pakistan">
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    <option value="Azad Kashmir">Azad Kashmir</option>
                    <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                  </optgroup>

                  <optgroup label="United States">
                    <option value="New York">New York</option>
                    <option value="Illinois">Illinois</option>
                    <option value="California">California</option>
                  </optgroup>
                  
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            {/* Password Fields - Only visible when editing */}
            {isEditing && (
              <>
                <div className="md:col-span-2">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>
          
          {/* Form Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Wrapper Component to pass in data ---
// This is how you would use the component in your app.
// You would fetch your data and pass it in as 'initialProfileData'.
export default function App() {
    
    // This is the mock data you would fetch from your MERN backend API
    const mockUserData = {
        firstName: "Maria",
        lastName: "Jones",
        email: "maria.jones@example.com",
        address: "123 Main Street",
        city: "New York",
        state: "New York",
        avatarUrl: "https://placehold.co/100x100/3B82F6/FFFFFF?text=MJ"
    };

    // To test with empty data:
    // const mockUserData = null; 

    return <Userinfo initialProfileData={mockUserData} />;
}