import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: 1,
      name: "MDCAT Complete Preparation 2025",
      category: "Medical",
      subjects: ["Biology", "Chemistry", "Physics", "English"],
      totalChapters: 48,
      completedChapters: 22,
      progress: 46,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80",
      status: "In Progress",
      lastAccessed: "2 hours ago",
      link: "/mdcat/mdcat-pre-medical"
    },
    {
      id: 2,
      name: "NUST NET Engineering Track",
      category: "Engineering",
      subjects: ["Mathematics", "Physics", "English", "Intelligence"],
      totalChapters: 36,
      completedChapters: 11,
      progress: 31,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
      status: "In Progress",
      lastAccessed: "Yesterday",
      link: "/net/net-engineering"
    },
    {
      id: 3,
      name: "NAT-IE Science Track",
      category: "Aptitude",
      subjects: ["Mathematics", "Physics", "English", "Analytical"],
      totalChapters: 28,
      completedChapters: 0,
      progress: 0,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
      status: "Not Started",
      lastAccessed: "Never",
      link: "/nat/nat-ie"
    },
    {
      id: 4,
      name: "English Grammar Mastery",
      category: "Language",
      subjects: ["Grammar", "Vocabulary", "Comprehension"],
      totalChapters: 20,
      completedChapters: 20,
      progress: 100,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80",
      status: "Completed",
      lastAccessed: "1 week ago",
      link: "/net/net-engineering/english"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" ||
      (activeTab === "inProgress" && course.status === "In Progress") ||
      (activeTab === "completed" && course.status === "Completed") ||
      (activeTab === "notStarted" && course.status === "Not Started");
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-emerald-100 text-emerald-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
          <p className="text-slate-500 mt-1">Browse and continue your learning journey</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Course
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {[
            { id: "all", label: "All" },
            { id: "inProgress", label: "In Progress" },
            { id: "completed", label: "Completed" },
            { id: "notStarted", label: "Not Started" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{courses.length}</p>
          <p className="text-xs text-slate-500">Total Courses</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{courses.filter(c => c.status === 'In Progress').length}</p>
          <p className="text-xs text-slate-500">In Progress</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{courses.filter(c => c.status === 'Completed').length}</p>
          <p className="text-xs text-slate-500">Completed</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{Math.round(courses.reduce((a, b) => a + b.progress, 0) / courses.length)}%</p>
          <p className="text-xs text-slate-500">Avg Progress</p>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-lg leading-tight">{course.name}</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.subjects.slice(0, 3).map((subject, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                  {course.subjects.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                      +{course.subjects.length - 3}
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium text-slate-900">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${course.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{course.completedChapters}/{course.totalChapters} chapters</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Last: {course.lastAccessed}</span>
                  <Link
                    to={course.link}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    {course.status === "Not Started" ? "Start" : "Continue"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <span className="text-4xl mb-4 block">📚</span>
          <p className="text-slate-900 font-medium">No courses found</p>
          <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default MyCourses;