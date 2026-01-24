import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";

// Chapter data with images
const subjectChapters = {
    mathematics: {
        name: "Mathematics",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80",
        description: "Master the fundamental concepts of mathematics essential for NUST NET examination",
        chapters: [
            { id: 1, title: "Algebra & Equations", topics: 8, time: "2h 30m", status: "completed", locked: false },
            { id: 2, title: "Trigonometry", topics: 6, time: "2h", status: "completed", locked: false },
            { id: 3, title: "Calculus - Differentiation", topics: 10, time: "3h", status: "in-progress", locked: false },
            { id: 4, title: "Calculus - Integration", topics: 8, time: "2h 45m", status: "not-started", locked: false },
            { id: 5, title: "Coordinate Geometry", topics: 7, time: "2h 15m", status: "not-started", locked: false },
            { id: 6, title: "Vectors", topics: 5, time: "1h 30m", status: "not-started", locked: true },
            { id: 7, title: "Matrices & Determinants", topics: 6, time: "2h", status: "not-started", locked: true },
            { id: 8, title: "Probability & Statistics", topics: 8, time: "2h 30m", status: "not-started", locked: true },
        ]
    },
    physics: {
        name: "Physics",
        image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80",
        description: "Understand the laws of physics and their applications for NET preparation",
        chapters: [
            { id: 1, title: "Mechanics - Kinematics", topics: 7, time: "2h", status: "completed", locked: false },
            { id: 2, title: "Mechanics - Dynamics", topics: 8, time: "2h 30m", status: "in-progress", locked: false },
            { id: 3, title: "Work, Energy & Power", topics: 6, time: "1h 45m", status: "not-started", locked: false },
            { id: 4, title: "Rotational Motion", topics: 5, time: "1h 30m", status: "not-started", locked: true },
            { id: 5, title: "Oscillations & Waves", topics: 8, time: "2h 15m", status: "not-started", locked: true },
            { id: 6, title: "Thermodynamics", topics: 7, time: "2h", status: "not-started", locked: true },
        ]
    },
    english: {
        name: "English",
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80",
        description: "Enhance your English language skills for comprehensive NET preparation",
        chapters: [
            { id: 1, title: "Vocabulary Building", topics: 10, time: "2h", status: "completed", locked: false },
            { id: 2, title: "Grammar Essentials", topics: 12, time: "2h 30m", status: "completed", locked: false },
            { id: 3, title: "Reading Comprehension", topics: 8, time: "2h", status: "in-progress", locked: false },
            { id: 4, title: "Sentence Correction", topics: 6, time: "1h 30m", status: "not-started", locked: false },
            { id: 5, title: "Synonyms & Antonyms", topics: 8, time: "1h 45m", status: "not-started", locked: true },
        ]
    },
    biology: {
        name: "Biology",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
        description: "Explore the science of life and living organisms for NET Applied Sciences",
        chapters: [
            { id: 1, title: "Cell Biology", topics: 8, time: "2h 30m", status: "completed", locked: false },
            { id: 2, title: "Genetics", topics: 10, time: "3h", status: "in-progress", locked: false },
            { id: 3, title: "Evolution", topics: 6, time: "1h 45m", status: "not-started", locked: false },
            { id: 4, title: "Human Physiology", topics: 12, time: "3h 30m", status: "not-started", locked: false },
            { id: 5, title: "Plant Biology", topics: 8, time: "2h", status: "not-started", locked: true },
        ]
    },
    chemistry: {
        name: "Chemistry",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
        description: "Master chemical concepts and reactions for NET examination",
        chapters: [
            { id: 1, title: "Atomic Structure", topics: 6, time: "1h 45m", status: "completed", locked: false },
            { id: 2, title: "Chemical Bonding", topics: 8, time: "2h", status: "in-progress", locked: false },
            { id: 3, title: "States of Matter", topics: 5, time: "1h 30m", status: "not-started", locked: false },
            { id: 4, title: "Thermochemistry", topics: 6, time: "1h 45m", status: "not-started", locked: false },
            { id: 5, title: "Chemical Equilibrium", topics: 7, time: "2h", status: "not-started", locked: true },
        ]
    }
};

const defaultChapters = {
    name: "Subject",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80",
    description: "Comprehensive preparation material for this subject",
    chapters: [
        { id: 1, title: "Chapter 1 - Introduction", topics: 5, time: "1h 30m", status: "not-started", locked: false },
        { id: 2, title: "Chapter 2 - Fundamentals", topics: 6, time: "1h 45m", status: "not-started", locked: false },
        { id: 3, title: "Chapter 3 - Core Concepts", topics: 7, time: "2h", status: "not-started", locked: true },
    ]
};

const ChapterSelection = () => {
    const { stream, subject } = useParams();
    const [searchQuery, setSearchQuery] = useState("");

    const subjectData = subjectChapters[subject] || {
        ...defaultChapters,
        name: subject?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    };

    const completedChapters = subjectData.chapters.filter(c => c.status === "completed").length;
    const inProgressChapters = subjectData.chapters.filter(c => c.status === "in-progress").length;
    const totalTopics = subjectData.chapters.reduce((acc, c) => acc + c.topics, 0);

    const filteredChapters = useMemo(() => {
        if (!searchQuery) return subjectData.chapters;
        return subjectData.chapters.filter(c =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [subjectData, searchQuery]);

    const getStatusStyles = (status) => {
        switch (status) {
            case "completed":
                return { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: "bg-emerald-500" };
            case "in-progress":
                return { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", icon: "bg-blue-500" };
            default:
                return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-600", icon: "bg-slate-300" };
        }
    };

    const formatStreamName = (str) => str?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '';

    return (
        <>
            <main className="min-h-screen bg-slate-50">
                {/* Header */}
                <div className="bg-white border-b border-slate-200">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                            <span className="text-slate-300">/</span>
                            <Link to="/net" className="hover:text-blue-600 transition">NET</Link>
                            <span className="text-slate-300">/</span>
                            <Link to={`/net/${stream}`} className="hover:text-blue-600 transition">{formatStreamName(stream)}</Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-slate-900 font-medium">{subjectData.name}</span>
                        </nav>

                        <div className="flex items-start gap-6">
                            <img
                                src={subjectData.image}
                                alt={subjectData.name}
                                className="w-20 h-20 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{subjectData.name}</h1>
                                <p className="text-slate-600">{subjectData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-8">
                        {/* Main Content */}
                        <div>
                            {/* Search */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search chapters..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                                />
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Chapters List */}
                            <div className="space-y-3">
                                {filteredChapters.map((chapter) => {
                                    const styles = getStatusStyles(chapter.status);
                                    return (
                                        <article
                                            key={chapter.id}
                                            className={`bg-white rounded-xl border ${chapter.locked ? 'opacity-60' : 'hover:border-blue-300'} border-slate-200 transition-all`}
                                        >
                                            <div className="p-5">
                                                <div className="flex items-start gap-4">
                                                    {/* Status Indicator */}
                                                    <div className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center flex-shrink-0`}>
                                                        {chapter.status === "completed" ? (
                                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : chapter.status === "in-progress" ? (
                                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                                                            </svg>
                                                        ) : (
                                                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-4 mb-2">
                                                            <h3 className="text-base font-semibold text-slate-900">
                                                                Chapter {chapter.id}: {chapter.title}
                                                            </h3>
                                                            {chapter.locked && (
                                                                <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                </svg>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                                </svg>
                                                                {chapter.topics} Topics
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                {chapter.time}
                                                            </span>
                                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles.bg} ${styles.text} ${styles.border} border`}>
                                                                {chapter.status === "completed" ? "Completed" : chapter.status === "in-progress" ? "In Progress" : "Not Started"}
                                                            </span>
                                                        </div>

                                                        {chapter.locked ? (
                                                            <button
                                                                disabled
                                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-400 text-sm cursor-not-allowed"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                </svg>
                                                                Complete previous chapters to unlock
                                                            </button>
                                                        ) : (
                                                            <Link
                                                                to={`/net/${stream}/${subject}/chapter-${chapter.id}`}
                                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                                                            >
                                                                View Topics
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            {filteredChapters.length === 0 && (
                                <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                                    <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-slate-700 mb-1">No chapters found</h3>
                                    <p className="text-slate-500 text-sm">Try adjusting your search query</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside>
                            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
                                <h3 className="text-lg font-semibold text-slate-900 mb-5">Subject Overview</h3>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-center">
                                        <div className="text-xl font-bold text-emerald-600">{completedChapters}</div>
                                        <div className="text-xs text-emerald-700">Completed</div>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center">
                                        <div className="text-xl font-bold text-blue-600">{inProgressChapters}</div>
                                        <div className="text-xs text-blue-700">In Progress</div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                                        <div className="text-xl font-bold text-slate-700">{subjectData.chapters.length}</div>
                                        <div className="text-xs text-slate-600">Total Chapters</div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                                        <div className="text-xl font-bold text-slate-700">{totalTopics}</div>
                                        <div className="text-xs text-slate-600">Total Topics</div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-600">Overall Progress</span>
                                        <span className="font-semibold text-slate-900">{Math.round((completedChapters / subjectData.chapters.length) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all"
                                            style={{ width: `${(completedChapters / subjectData.chapters.length) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Study Tip */}
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-blue-900 mb-1">💡 Study Tip</h4>
                                    <p className="text-xs text-blue-700">
                                        Complete chapters sequentially for best results. Start with fundamentals before advancing to complex topics.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ChapterSelection;
