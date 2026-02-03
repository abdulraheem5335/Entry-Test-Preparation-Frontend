import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import gsap from 'gsap';

// --- Icon Components ---
const ArrowUpIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>;
const TrendingUpIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const BookOpenIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
const TargetIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
const ClockIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const AwardIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>;
const FlameIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>;
const SparklesIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>;
const PlayIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3" /></svg>;
const CrownIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" /><path d="M3 20h18" /></svg>;
const ChevronRightIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>;
const CalendarIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>;
const ZapIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;

// --- Helper Components ---
const ChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 px-3 py-2 rounded-lg shadow-xl border border-slate-700">
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className="text-white font-bold">{payload[0].value}%</p>
            </div>
        );
    }
    return null;
};

const GlowingCard = ({ children, className = "" }) => (
    <div className={`relative group ${className}`}>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300">
            {children}
        </div>
    </div>
);

const RadialProgress = ({ percentage, size = 120, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-slate-100"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    stroke="#3b82f6"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-700">{percentage}%</span>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, change, changeLabel, iconBg }) => (
    <GlowingCard>
        <div className="p-5">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shadow-sm`}>
                    {icon}
                </div>
                {change && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        <ArrowUpIcon className="w-3 h-3" />
                        {change}%
                    </div>
                )}
            </div>
            <p className="text-sm text-slate-500 font-medium">{label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
            {changeLabel && <p className="text-xs text-slate-400 mt-1">{changeLabel}</p>}
        </div>
    </GlowingCard>
);

const QuickActionCard = ({ icon, title, description, to, color }) => {
    const colorClasses = {
        blue: "bg-blue-600 hover:bg-blue-700",
        violet: "bg-violet-600 hover:bg-violet-700",
        emerald: "bg-emerald-600 hover:bg-emerald-700",
        orange: "bg-blue-600 hover:bg-blue-700",
    };

    return (
        <Link to={to} className={`${colorClasses[color]} p-4 rounded-xl text-white transition-all duration-300 hover:shadow-lg flex items-center gap-4 group`}>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition">
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-white/80">{description}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>
    );
};

// --- Main Dashboard Component ---
const StudentDashboard = ({ studentData = null }) => {
    const [activeTab, setActiveTab] = useState('week');
    const dashboardRef = useRef(null);
    const headerRef = useRef(null);
    const statsRef = useRef(null);
    const chartsRef = useRef(null);
    const actionsRef = useRef(null);

    // GSAP Animations
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );

            // Stats cards stagger
            const statCards = statsRef.current?.children;
            if (statCards) {
                gsap.fromTo(
                    statCards,
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
                );
            }

            // Charts section
            if (chartsRef.current) {
                gsap.fromTo(
                    chartsRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: 'power3.out' }
                );
            }

            // Quick actions
            const actionCards = actionsRef.current?.children;
            if (actionCards) {
                gsap.fromTo(
                    actionCards,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
                );
            }
        }, dashboardRef);

        return () => ctx.revert();
    }, []);

    const defaultData = {
        student: {
            name: "Sophia Bennett",
            major: "Computer Science, 2024",
            avatarUrl: "https://placehold.co/100x100/3B82F6/FFFFFF?text=SB&font=sans",
            streak: 12,
            rank: 3,
            totalStudents: 156,
        },
        stats: {
            overallPerformance: 85,
            performanceChange: 5.2,
            quizzesTaken: 27,
            highestScore: 98,
            studyHours: 42,
            accuracy: 87,
        },
        weeklyProgress: [
            { day: "Mon", score: 78 },
            { day: "Tue", score: 82 },
            { day: "Wed", score: 80 },
            { day: "Thu", score: 88 },
            { day: "Fri", score: 85 },
            { day: "Sat", score: 90 },
            { day: "Sun", score: 92 },
        ],
        monthlyProgress: [
            { day: "Week 1", score: 75 },
            { day: "Week 2", score: 80 },
            { day: "Week 3", score: 85 },
            { day: "Week 4", score: 88 },
        ],
        subjectPerformance: [
            { name: "Math", score: 90, color: "#3b82f6" },
            { name: "Physics", score: 80, color: "#8b5cf6" },
            { name: "CS", score: 85, color: "#06b6d4" },
            { name: "English", score: 75, color: "#10b981" },
            { name: "Logical", score: 99, color: "#f59e0b" },
        ],
        leaderboard: [
            { name: "Ethan Harper", score: 88, avatarUrl: "https://placehold.co/40x40/E5E7EB/4B5563?text=EH", badge: "gold" },
            { name: "Olivia Carter", score: 87, avatarUrl: "https://placehold.co/40x40/E5E7EB/4B5563?text=OC", badge: "silver" },
            { name: "Sophia Bennett", score: 85, avatarUrl: "https://placehold.co/40x40/3B82F6/FFFFFF?text=SB", badge: "bronze" },
            { name: "Liam Foster", score: 82, avatarUrl: "https://placehold.co/40x40/E5E7EB/4B5563?text=LF" },
        ],
        recentActivity: [
            { type: "quiz", title: "Physics - Mechanics", score: 92, time: "2 hours ago" },
            { type: "lesson", title: "Calculus Fundamentals", time: "5 hours ago" },
            { type: "quiz", title: "English Grammar", score: 88, time: "Yesterday" },
        ],
        upcomingGoals: [
            { title: "Complete 5 Math Quizzes", progress: 60 },
            { title: "Watch Physics Videos", progress: 40 },
            { title: "Practice Tests - Weekly", progress: 80 },
        ],
    };

    const data = studentData || defaultData;
    const progressData = activeTab === 'week' ? data.weeklyProgress : data.monthlyProgress;

    const RADIAN = Math.PI / 180;
    const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div ref={dashboardRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30 text-slate-800 p-4 md:p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header ref={headerRef} className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                    Welcome back, {data.student.name.split(' ')[0]}!
                                </h1>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-orange-200">
                                    <FlameIcon className="w-4 h-4" />
                                    {data.student.streak} day streak
                                </div>
                            </div>
                            <p className="text-slate-500 flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/profile/premium" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 hover:shadow-md transition-all duration-300">
                                <CrownIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">Upgrade to Pro</span>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    {/* Main Content Area - 3 columns on XL */}
                    <div className="xl:col-span-3 space-y-6">
                        {/* Stats Cards */}
                        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard
                                icon={<TrendingUpIcon className="w-6 h-6 text-white" />}
                                label="Performance"
                                value={`${data.stats.overallPerformance}%`}
                                change={data.stats.performanceChange}
                                iconBg="bg-blue-600"
                            />
                            <StatCard
                                icon={<BookOpenIcon className="w-6 h-6 text-white" />}
                                label="Quizzes Taken"
                                value={data.stats.quizzesTaken}
                                changeLabel="This month"
                                iconBg="bg-emerald-600"
                            />
                            <StatCard
                                icon={<TargetIcon className="w-6 h-6 text-white" />}
                                label="Accuracy"
                                value={`${data.stats.accuracy}%`}
                                iconBg="bg-amber-600"
                            />
                            <StatCard
                                icon={<ClockIcon className="w-6 h-6 text-white" />}
                                label="Study Hours"
                                value={`${data.stats.studyHours}h`}
                                changeLabel="This week"
                                iconBg="bg-rose-600"
                            />
                        </div>


                        {/* Charts Section */}
                        <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Progress Chart */}
                            <GlowingCard>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-slate-900">Progress Overview</h3>
                                        <div className="flex bg-slate-100 rounded-lg p-0.5">
                                            <button
                                                onClick={() => setActiveTab('week')}
                                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${activeTab === 'week' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
                                            >
                                                Week
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('month')}
                                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${activeTab === 'month' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
                                            >
                                                Month
                                            </button>
                                        </div>
                                    </div>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                                            <Tooltip content={<ChartTooltip />} />
                                            <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </GlowingCard>

                            {/* Subject Performance */}
                            <GlowingCard>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Subject Performance</h3>
                                    <div className="flex items-center gap-4">
                                        <ResponsiveContainer width="50%" height={180}>
                                            <PieChart>
                                                <Pie
                                                    data={data.subjectPerformance}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={renderPieLabel}
                                                    outerRadius={70}
                                                    innerRadius={35}
                                                    dataKey="score"
                                                    stroke="#fff"
                                                    strokeWidth={2}
                                                >
                                                    {data.subjectPerformance.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="flex-1 space-y-2">
                                            {data.subjectPerformance.map((subject, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                                                    <span className="text-sm text-slate-600 flex-1">{subject.name}</span>
                                                    <span className="text-sm font-semibold text-slate-800">{subject.score}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </GlowingCard>
                        </div>

                        {/* Bar Chart - Full Width */}
                        <GlowingCard>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-6">Subject Scores Breakdown</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={data.subjectPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                                        <Tooltip content={<ChartTooltip />} />
                                        <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </GlowingCard>
                    </div>

                    {/* Sidebar - 1 column on XL */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <GlowingCard>
                            <div className="p-6">
                                <div className="text-center">
                                    <div className="relative inline-block mb-4">
                                        <img
                                            src={data.student.avatarUrl}
                                            alt="Student Avatar"
                                            className="w-20 h-20 rounded-2xl border-4 border-white shadow-md"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <ZapIcon className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-900">{data.student.name}</h2>
                                    <p className="text-sm text-blue-600 font-medium">{data.student.major}</p>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <span className="text-xs text-slate-500">Rank</span>
                                        <span className="font-bold text-slate-800">#{data.student.rank}</span>
                                        <span className="text-xs text-slate-400">of {data.student.totalStudents}</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-center">
                                    <RadialProgress percentage={data.stats.overallPerformance} size={100} strokeWidth={8} />
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="font-semibold text-slate-800">Course Progress</p>
                                    <p className="text-sm text-slate-500">{data.stats.quizzesTaken} quizzes completed</p>
                                </div>
                            </div>
                        </GlowingCard>

                        {/* Goals Progress */}
                        <GlowingCard>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-slate-900">Goals</h3>
                                    <span className="text-xs text-slate-500">This Week</span>
                                </div>
                                <div className="space-y-4">
                                    {data.upcomingGoals.map((goal, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-slate-700">{goal.title}</span>
                                                <span className="text-xs font-semibold text-slate-500">{goal.progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${goal.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GlowingCard>

                        {/* Leaderboard */}
                        <GlowingCard>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-slate-900">Leaderboard</h3>
                                    <Link to="/profile/leaderboard" className="text-xs text-blue-600 font-medium hover:underline">View All</Link>
                                </div>
                                <div className="space-y-3">
                                    {data.leaderboard.map((student, index) => {
                                        const badgeColors = {
                                            gold: "bg-amber-500",
                                            silver: "bg-slate-400",
                                            bronze: "bg-orange-500",
                                        };
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${student.name === data.student.name
                                                    ? 'bg-blue-50 border border-blue-200'
                                                    : 'hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="relative">
                                                    <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-xl" />
                                                    {student.badge && (
                                                        <div className={`absolute -top-1 -right-1 w-5 h-5 ${badgeColors[student.badge]} rounded-full flex items-center justify-center shadow-sm`}>
                                                            <span className="text-[10px] text-white font-bold">{index + 1}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-slate-800 text-sm truncate">{student.name}</p>
                                                    <p className="text-xs text-slate-500">{student.score}%</p>
                                                </div>
                                                {!student.badge && (
                                                    <div className="text-sm font-bold text-slate-400">#{index + 1}</div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </GlowingCard>

                        {/* Recent Activity */}
                        <GlowingCard>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    {data.recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.type === 'quiz'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-emerald-100 text-emerald-600'
                                                }`}>
                                                {activity.type === 'quiz' ? <TargetIcon className="w-4 h-4" /> : <BookOpenIcon className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-800 truncate">{activity.title}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {activity.score && (
                                                        <span className="text-xs font-semibold text-emerald-600">{activity.score}%</span>
                                                    )}
                                                    <span className="text-xs text-slate-400">{activity.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GlowingCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
