import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- Icon Component ---
const ArrowUpIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>;

// --- Helper Components ---
const ChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <p className="text-sm text-gray-600 font-medium">{label}</p>
                <p className="text-blue-600 font-bold">{payload[0].value}%</p>
            </div>
        );
    }
    return null;
};

const RadialProgress = ({ percentage, size = 120, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-gray-200"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-blue-600"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
            </div>
        </div>
    );
};


// --- Main Dashboard Component ---
const StudentDashboard = ({ studentData = null }) => {
    const defaultData = {
        student: {
            name: "Sophia Bennett",
            major: "Computer Science, 2024",
            avatarUrl: "https://placehold.co/100x100/3B82F6/FFFFFF?text=SB&font=sans",
        },
        stats: {
            overallPerformance: 85,
            performanceChange: 5.2,
            quizzesTaken: 27,
            highestScore: 98,
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
        subjectPerformance: [
            { name: "Math", score: 90 },
            { name: "Physics", score: 80 },
            { name: "CS", score: 85 },
            { name: "English", score: 75 },
			{ name: "Logical Reasoning", score: 99 },

        ],
        leaderboard: [
            { name: "Ethan Harper", score: 88, avatarUrl: "https://placehold.co/40x40/E5E7EB/4B5563?text=EH" },
            { name: "Olivia Carter", score: 87, avatarUrl: "https://placehold.co/40x40/E5E7EB/4B5563?text=OC" },
            { name: "Sophia Bennett", score: 85, avatarUrl: "https://placehold.co/40x40/3B82F6/FFFFFF?text=SB" },
            { name: "Liam Foster", score: 82, avatarUrl: "https://placehold.co/40x40/E5E7EB/4B5563?text=LF" },
        ]
    };

    const data = studentData || defaultData;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {data.student.name}. Here's your performance snapshot.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left & Center Columns: Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                               <p className="text-sm text-gray-500 mb-2">Overall Performance</p>
                               <p className="text-4xl font-bold text-gray-900 mb-2">{data.stats.overallPerformance}%</p>
                               <div className="flex items-center text-sm text-green-600 font-medium">
                                   <ArrowUpIcon className="w-4 h-4 mr-1"/>
                                   <span>{data.stats.performanceChange}% this month</span>
                               </div>
                           </div>
                           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                               <p className="text-sm text-gray-500 mb-2">Quizzes Taken</p>
                               <p className="text-4xl font-bold text-gray-900">{data.stats.quizzesTaken}</p>
                           </div>
                           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                               <p className="text-sm text-gray-500 mb-2">Highest Score</p>
                               <p className="text-4xl font-bold text-gray-900">{data.stats.highestScore}%</p>
                           </div>
                        </div>

                        {/* Weekly Progress */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
                             <ResponsiveContainer width="100%" height={250}>
                                 <AreaChart data={data.weeklyProgress} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                     <XAxis dataKey="day" tick={{ fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                                     <YAxis tick={{ fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                                     <Tooltip content={<ChartTooltip />} />
                                     <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2.5} />
                                 </AreaChart>
                             </ResponsiveContainer>
                        </div>
                        
                        {/* Subject Performance */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={data.subjectPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                     <XAxis dataKey="name" tick={{ fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                                     <YAxis tick={{ fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                                     <Tooltip content={<ChartTooltip />} />
                                     <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="text-center mb-6">
                                <img src={data.student.avatarUrl} alt="Student Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"/>
                                <h2 className="text-xl font-bold text-gray-900">{data.student.name}</h2>
                                <p className="text-sm text-blue-600 font-medium">{data.student.major}</p>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Course Progress</h3>
                            <div className="flex items-center justify-center gap-6">
                                <RadialProgress percentage={data.stats.overallPerformance} size={100} strokeWidth={8} />
                                <div className="text-left">
                                    <p className="font-bold text-gray-800">Excellent Work!</p>
                                    <p className="text-sm text-gray-500">{data.stats.quizzesTaken} quizzes completed.</p>
                                    <p className="text-sm text-gray-500">Keep it up!</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard</h3>
                            <div className="space-y-4">
                               {data.leaderboard.map((student, index) => (
                                   <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${student.name === data.student.name ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                                       <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full" />
                                       <div className="flex-1 min-w-0">
                                           <p className="font-semibold text-gray-800 truncate">{student.name}</p>
                                           <p className="text-sm text-gray-500">{student.score}%</p>
                                       </div>
                                       <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                                   </div>
                               ))}
                            </div>
                        </div>
                         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-blue-500/20 shadow-lg hover:shadow-blue-500/30">
                            Start New Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;

