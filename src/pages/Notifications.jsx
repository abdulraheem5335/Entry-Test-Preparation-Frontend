import React, { useState } from "react";

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, type: "reminder", title: "Study Reminder", message: "You haven't studied Biology today. Keep your streak going!", time: "10 minutes ago", read: false },
        { id: 2, type: "achievement", title: "Achievement Unlocked! 🏆", message: "You completed 100 MCQs in Chemistry. Great progress!", time: "2 hours ago", read: false },
        { id: 3, type: "update", title: "New Content Available", message: "Physics Chapter 6 - Waves and Optics is now available.", time: "Yesterday", read: true },
        { id: 4, type: "result", title: "Mock Test Results", message: "Your MDCAT Mock Test #3 results are ready. You scored 172/200!", time: "2 days ago", read: true },
        { id: 5, type: "reminder", title: "Scheduled Practice", message: "Don't forget your scheduled English practice at 5:00 PM", time: "3 days ago", read: true }
    ]);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case "reminder": return "⏰";
            case "achievement": return "🏆";
            case "update": return "📚";
            case "result": return "📊";
            default: return "🔔";
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Notifications</h1>
                    <p className="text-slate-500 text-sm sm:text-base mt-1">Stay updated with your learning progress</p>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={markAllRead}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Unread Badge */}
            {unreadCount > 0 && (
                <div className="mb-4 px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                </div>
            )}

            {/* Notifications List */}
            <div className="space-y-3">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-xl border transition-all ${notification.read
                                ? 'bg-white border-slate-200'
                                : 'bg-blue-50 border-blue-200 shadow-sm'
                            }`}
                    >
                        <div className="flex items-start gap-3 sm:gap-4">
                            <span className="text-2xl flex-shrink-0">{getIcon(notification.type)}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{notification.title}</h4>
                                    {!notification.read && (
                                        <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                    )}
                                </div>
                                <p className="text-slate-600 text-sm mt-1">{notification.message}</p>
                                <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                {!notification.read && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                                        title="Mark as read"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                                    title="Delete"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {notifications.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                    <span className="text-5xl mb-4 block">🔔</span>
                    <p className="text-slate-900 font-medium">All caught up!</p>
                    <p className="text-slate-500 text-sm mt-1">No notifications at the moment</p>
                </div>
            )}
        </div>
    );
};

export default Notifications;
