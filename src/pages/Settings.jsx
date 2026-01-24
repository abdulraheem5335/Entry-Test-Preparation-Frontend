import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");

    // Load settings from localStorage on initial render
    const loadSettings = () => {
        const saved = localStorage.getItem('userSettings');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            timezone: "Asia/Karachi (PKT)",
            studyReminders: true,
            emailNotifications: true,
            pushNotifications: false,
            dailyGoal: 2,
            soundEffects: true,
            autoPlayVideos: false
        };
    };

    const [settings, setSettings] = useState(loadSettings);
    const [saved, setSaved] = useState(false);

    // Save to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }, [settings]);

    const handleSave = () => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleDeleteAccount = () => {
        if (deleteConfirmText === "DELETE") {
            // Clear all user data
            localStorage.removeItem('userSettings');
            localStorage.removeItem('isLoggedIn');
            // Redirect to home
            navigate('/');
            // Reload to reset state
            window.location.reload();
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 text-sm sm:text-base mt-1">Customize your learning experience</p>
            </div>

            {/* Current Settings Display */}
            <div className="mb-4 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                <p className="text-slate-600">
                    <strong>Current:</strong> {settings.timezone} | Daily Goal: {settings.dailyGoal}h
                </p>
            </div>

            {/* Success Message */}
            {saved && (
                <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Settings saved successfully!
                </div>
            )}

            {/* General Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 mb-4">
                <h3 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base">
                    General
                </h3>
                <div className="space-y-0">
                    {/* Timezone */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-100 gap-2">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 text-sm sm:text-base">Timezone</p>
                            <p className="text-xs sm:text-sm text-slate-500">Used for reminders and schedules</p>
                        </div>
                        <select
                            value={settings.timezone}
                            onChange={(e) => updateSetting('timezone', e.target.value)}
                            className="w-full sm:w-auto px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm cursor-pointer"
                            style={{ minWidth: '180px' }}
                        >
                            <option value="Asia/Karachi (PKT)">Asia/Karachi (PKT)</option>
                            <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
                            <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                        </select>
                    </div>

                    {/* Daily Goal */}
                    <div className="flex items-center justify-between py-3 gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 text-sm sm:text-base">Daily Study Goal</p>
                            <p className="text-xs sm:text-sm text-slate-500">Set your daily study target</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={() => updateSetting('dailyGoal', Math.max(1, settings.dailyGoal - 1))}
                                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-sm cursor-pointer active:bg-slate-300 select-none"
                            >−</button>
                            <span className="font-semibold text-slate-900 w-8 text-center text-sm sm:text-base">{settings.dailyGoal}h</span>
                            <button
                                type="button"
                                onClick={() => updateSetting('dailyGoal', Math.min(8, settings.dailyGoal + 1))}
                                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-sm cursor-pointer active:bg-slate-300 select-none"
                            >+</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 mb-4">
                <h3 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base">
                    Notifications
                </h3>
                <div className="space-y-0">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100 gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 text-sm sm:text-base">Study Reminders</p>
                            <p className="text-xs sm:text-sm text-slate-500">Get reminded to study daily</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateSetting('studyReminders', !settings.studyReminders)}
                            className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 cursor-pointer ${settings.studyReminders ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${settings.studyReminders ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-slate-100 gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 text-sm sm:text-base">Email Notifications</p>
                            <p className="text-xs sm:text-sm text-slate-500">Receive updates via email</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                            className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 cursor-pointer ${settings.emailNotifications ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3 gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 text-sm sm:text-base">Push Notifications</p>
                            <p className="text-xs sm:text-sm text-slate-500">Get browser push notifications</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateSetting('pushNotifications', !settings.pushNotifications)}
                            className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 cursor-pointer ${settings.pushNotifications ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${settings.pushNotifications ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Study Preferences */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 mb-4">
                <h3 className="font-semibold text-slate-900 mb-4 text-sm sm:text-base">
                    Study Preferences
                </h3>
                <div className="space-y-0">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100 gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 text-sm sm:text-base">Sound Effects</p>
                            <p className="text-xs sm:text-sm text-slate-500">Play sounds for correct/wrong answers</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateSetting('soundEffects', !settings.soundEffects)}
                            className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 cursor-pointer ${settings.soundEffects ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${settings.soundEffects ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3 gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 text-sm sm:text-base">Auto-play Videos</p>
                            <p className="text-xs sm:text-sm text-slate-500">Automatically play next video</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateSetting('autoPlayVideos', !settings.autoPlayVideos)}
                            className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 cursor-pointer ${settings.autoPlayVideos ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${settings.autoPlayVideos ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <button
                type="button"
                onClick={handleSave}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer active:bg-blue-800"
            >
                {saved ? (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Saved!
                    </>
                ) : (
                    'Save Settings'
                )}
            </button>

            {/* Danger Zone */}
            <div className="mt-4 bg-white rounded-xl border border-rose-200 p-4 sm:p-6">
                <h3 className="font-semibold text-rose-600 mb-4 text-sm sm:text-base">
                    Danger Zone
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 text-sm sm:text-base">Delete Account</p>
                        <p className="text-xs sm:text-sm text-slate-500">Permanently delete your account and all data</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full sm:w-auto px-4 py-2 bg-rose-100 text-rose-600 font-medium rounded-lg hover:bg-rose-200 transition text-sm cursor-pointer"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Delete Account?</h3>
                            <p className="text-slate-500 mt-2 text-sm">
                                This action cannot be undone. All your data, progress, and settings will be permanently deleted.
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Type <span className="font-bold text-rose-600">DELETE</span> to confirm
                            </label>
                            <input
                                type="text"
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                                placeholder="Type DELETE"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteConfirmText("");
                                }}
                                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirmText !== "DELETE"}
                                className={`flex-1 px-4 py-2.5 font-medium rounded-lg transition ${deleteConfirmText === "DELETE"
                                    ? 'bg-rose-600 text-white hover:bg-rose-700 cursor-pointer'
                                    : 'bg-rose-200 text-rose-400 cursor-not-allowed'
                                    }`}
                            >
                                Delete Forever
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
