import React from "react";
import { Link } from "react-router-dom";

const CoursesEnrolled = () => {
    const enrolledCourses = [
        {
            id: 1,
            name: "MDCAT Complete Preparation 2025",
            instructor: "Dr. Sarah Khan",
            progress: 45,
            totalLessons: 120,
            completedLessons: 54,
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80",
            category: "Medical",
            duration: "6 months",
            nextLesson: "Biology: Cell Structure",
            status: "In Progress"
        },
        {
            id: 2,
            name: "NUST NET Engineering Track",
            instructor: "Prof. Ahmed Ali",
            progress: 30,
            totalLessons: 85,
            completedLessons: 26,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
            category: "Engineering",
            duration: "4 months",
            nextLesson: "Physics: Mechanics",
            status: "In Progress"
        },
        {
            id: 3,
            name: "English Grammar Mastery",
            instructor: "Ms. Fatima Zahra",
            progress: 100,
            totalLessons: 40,
            completedLessons: 40,
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80",
            category: "Language",
            duration: "2 months",
            nextLesson: null,
            status: "Completed"
        }
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Courses Enrolled</h1>
                <p className="text-slate-500 mt-1">Track your enrolled courses and continue learning</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-2xl font-bold text-blue-600">{enrolledCourses.length}</p>
                    <p className="text-sm text-blue-700">Total Courses</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <p className="text-2xl font-bold text-emerald-600">{enrolledCourses.filter(c => c.status === 'Completed').length}</p>
                    <p className="text-sm text-emerald-700">Completed</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <p className="text-2xl font-bold text-amber-600">{enrolledCourses.filter(c => c.status === 'In Progress').length}</p>
                    <p className="text-sm text-amber-700">In Progress</p>
                </div>
            </div>

            {/* Course Cards */}
            <div className="space-y-4">
                {enrolledCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-48 h-36 md:h-auto">
                                <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${course.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {course.status}
                                        </span>
                                        <h3 className="text-lg font-semibold text-slate-900">{course.name}</h3>
                                        <p className="text-sm text-slate-500">by {course.instructor}</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600">Progress</span>
                                        <span className="font-medium text-slate-900">{course.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">{course.completedLessons}/{course.totalLessons} lessons completed</p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex gap-4 text-xs text-slate-500">
                                        <span>📚 {course.category}</span>
                                        <span>⏱️ {course.duration}</span>
                                    </div>
                                    {course.nextLesson ? (
                                        <Link
                                            to={course.name.includes("MDCAT") ? "/mdcat/mdcat-pre-medical" : "/net/net-engineering"}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Continue Learning
                                        </Link>
                                    ) : (
                                        <span className="px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg">
                                            ✓ Completed
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Browse More Courses */}
            <div className="mt-8 text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-slate-600 mb-3">Want to explore more courses?</p>
                <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                    Browse All Courses
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default CoursesEnrolled;
