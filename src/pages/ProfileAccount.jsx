import React, { useState } from "react";

const ProfileAccount = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "Ahmed",
        lastName: "Khan",
        email: "ahmed.khan@email.com",
        phone: "+92 300 1234567",
        city: "Lahore",
        institution: "Punjab College",
        targetExam: "MDCAT 2025",
        bio: "Aspiring medical student preparing for MDCAT 2025",
        educationLevel: "FSc Pre-Medical",
        board: "BISE Lahore"
    });
    const [originalData, setOriginalData] = useState({ ...formData });
    const [saved, setSaved] = useState(false);

    const handleEdit = () => {
        setOriginalData({ ...formData });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData({ ...originalData });
        setIsEditing(false);
    };

    const handleSave = () => {
        setSaved(true);
        setIsEditing(false);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                    <p className="text-slate-500 mt-1">Manage your personal information</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Success Message */}
            {saved && (
                <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Profile updated successfully!
                </div>
            )}

            {/* Profile Header Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 sm:p-6 mb-6 text-white">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl sm:text-4xl font-bold border-4 border-white/30">
                            {formData.firstName[0]}{formData.lastName[0]}
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition shadow-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-xl sm:text-2xl font-bold">{formData.firstName} {formData.lastName}</h2>
                        <p className="text-blue-100">{formData.email}</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                                🎯 {formData.targetExam}
                            </span>
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                                📍 {formData.city}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                    { id: "profile", label: "Personal Info" },
                    { id: "education", label: "Education" },
                    { id: "password", label: "Password" }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${activeTab === tab.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Profile Form */}
            {activeTab === "profile" && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Target Exam</label>
                            <select
                                value={formData.targetExam}
                                onChange={e => setFormData({ ...formData, targetExam: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            >
                                <option>MDCAT 2025</option>
                                <option>NUST NET 2025</option>
                                <option>NAT-IE 2025</option>
                                <option>NAT-IIM 2025</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                disabled={!isEditing}
                                rows={3}
                                className={`w-full px-4 py-2.5 rounded-lg border resize-none transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            />
                        </div>
                    </div>
                    {isEditing && (
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleSave}
                                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Institution</label>
                            <input
                                type="text"
                                value={formData.institution}
                                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Education Level</label>
                            <select
                                value={formData.educationLevel}
                                onChange={e => setFormData({ ...formData, educationLevel: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            >
                                <option>FSc Pre-Medical</option>
                                <option>FSc Pre-Engineering</option>
                                <option>A-Levels</option>
                                <option>ICS</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Board/University</label>
                            <select
                                value={formData.board}
                                onChange={e => setFormData({ ...formData, board: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2.5 rounded-lg border transition ${isEditing
                                        ? 'border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
                                        : 'border-transparent bg-slate-50 text-slate-700'
                                    }`}
                            >
                                <option>BISE Lahore</option>
                                <option>BISE Karachi</option>
                                <option>BISE Rawalpindi</option>
                                <option>Federal Board</option>
                                <option>Cambridge</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button onClick={handleSave} className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                                Save Changes
                            </button>
                            <button onClick={handleCancel} className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition">
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Password Tab */}
            {activeTab === "password" && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
                    <div className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                        </div>
                    </div>
                    <button className="mt-6 w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                        Update Password
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileAccount;
