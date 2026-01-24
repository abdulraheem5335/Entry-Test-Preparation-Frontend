import React, { useState, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";

const chapterTopics = {
    "chapter-1": [
        { id: 1, title: "Introduction to Concepts", description: "Basic concepts and fundamentals", difficulty: "Easy", time: "15 min", mcqs: 25, completed: { mcqs: 80, notes: 100, video: 100 } },
        { id: 2, title: "Core Principles", description: "Understanding key principles", difficulty: "Medium", time: "20 min", mcqs: 30, completed: { mcqs: 60, notes: 50, video: 100 } },
        { id: 3, title: "Advanced Applications", description: "Applying concepts to problems", difficulty: "Hard", time: "25 min", mcqs: 20, completed: { mcqs: 0, notes: 0, video: 0 } },
        { id: 4, title: "Problem Solving", description: "Practice with solved examples", difficulty: "Medium", time: "20 min", mcqs: 28, completed: { mcqs: 0, notes: 0, video: 0 } },
        { id: 5, title: "Practice Questions", description: "Additional practice material", difficulty: "Easy", time: "15 min", mcqs: 22, completed: { mcqs: 100, notes: 100, video: 100 } },
    ],
    "chapter-2": [
        { id: 1, title: "Fundamentals", description: "Understanding the basics", difficulty: "Easy", time: "15 min", mcqs: 20, completed: { mcqs: 100, notes: 100, video: 100 } },
        { id: 2, title: "Key Concepts", description: "Main ideas and theories", difficulty: "Medium", time: "20 min", mcqs: 25, completed: { mcqs: 75, notes: 100, video: 50 } },
        { id: 3, title: "Applications", description: "Real-world applications", difficulty: "Hard", time: "22 min", mcqs: 22, completed: { mcqs: 0, notes: 0, video: 0 } },
    ],
    "chapter-3": [
        { id: 1, title: "Basic Theory", description: "Foundation concepts", difficulty: "Medium", time: "20 min", mcqs: 22, completed: { mcqs: 100, notes: 100, video: 100 } },
        { id: 2, title: "Intermediate Topics", description: "Building on basics", difficulty: "Medium", time: "18 min", mcqs: 20, completed: { mcqs: 50, notes: 100, video: 80 } },
        { id: 3, title: "Advanced Topics", description: "Complex concepts", difficulty: "Hard", time: "25 min", mcqs: 30, completed: { mcqs: 30, notes: 0, video: 0 } },
    ]
};

const defaultTopics = [
    { id: 1, title: "Introduction", description: "Basic concepts", difficulty: "Easy", time: "15 min", mcqs: 20, completed: { mcqs: 0, notes: 0, video: 0 } },
    { id: 2, title: "Core Concepts", description: "Key principles", difficulty: "Medium", time: "20 min", mcqs: 25, completed: { mcqs: 0, notes: 0, video: 0 } },
    { id: 3, title: "Advanced Topics", description: "Complex problem-solving", difficulty: "Hard", time: "25 min", mcqs: 30, completed: { mcqs: 0, notes: 0, video: 0 } },
];

const TopicsPage = () => {
    const { stream, subject, chapter } = useParams();
    const location = useLocation();
    const [bookmarked, setBookmarked] = useState([]);

    const examType = location.pathname.includes('/mdcat') ? 'mdcat' : location.pathname.includes('/nat') ? 'nat' : 'net';

    const topics = chapterTopics[chapter] || defaultTopics;
    const chapterNumber = chapter?.replace("chapter-", "") || "1";
    const chapterTitle = `Chapter ${chapterNumber}`;

    const completedTopics = topics.filter(t => t.completed.mcqs === 100 && t.completed.notes === 100 && t.completed.video === 100).length;
    const overallProgress = useMemo(() => {
        const total = topics.reduce((acc, t) => acc + (t.completed.mcqs + t.completed.notes + t.completed.video) / 3, 0);
        return Math.round(total / topics.length);
    }, [topics]);

    const toggleBookmark = (id) => {
        setBookmarked(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
    };

    const getDifficultyStyle = (difficulty) => {
        switch (difficulty) {
            case "Easy": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Medium": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Hard": return "bg-rose-50 text-rose-700 border-rose-200";
            default: return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    const formatName = (str) => str?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '';

    return (
        <>
            <main className="min-h-screen bg-slate-50">
                <div className="bg-white border-b border-slate-200">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                            <span className="text-slate-300">/</span>
                            <Link to={`/${examType}`} className="hover:text-blue-600 transition">{examType.toUpperCase()}</Link>
                            <span className="text-slate-300">/</span>
                            <Link to={`/${examType}/${stream}`} className="hover:text-blue-600 transition">{formatName(stream)}</Link>
                            <span className="text-slate-300">/</span>
                            <Link to={`/${examType}/${stream}/${subject}`} className="hover:text-blue-600 transition">{formatName(subject)}</Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-slate-900 font-medium">{chapterTitle}</span>
                        </nav>

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{chapterTitle}</h1>
                                <p className="text-slate-600">{formatName(subject)} • {topics.length} Topics</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-center">
                                    <div className="text-xl font-bold text-blue-600">{completedTopics}/{topics.length}</div>
                                    <div className="text-xs text-blue-700">Topics Done</div>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2 text-center">
                                    <div className="text-xl font-bold text-emerald-600">{overallProgress}%</div>
                                    <div className="text-xs text-emerald-700">Complete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-[1fr_280px] gap-8">
                        <div className="space-y-4">
                            {topics.map((topic) => (
                                <article key={topic.id} className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all">
                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyStyle(topic.difficulty)}`}>{topic.difficulty}</span>
                                                </div>
                                                <p className="text-slate-500 text-sm">{topic.description}</p>
                                            </div>
                                            <button
                                                onClick={() => toggleBookmark(topic.id)}
                                                className={`p-2 rounded-lg transition ${bookmarked.includes(topic.id) ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                            >
                                                <svg className="w-5 h-5" fill={bookmarked.includes(topic.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Estimated: {topic.time}
                                        </div>

                                        <div className="grid sm:grid-cols-3 gap-3">
                                            <Link to={`/${examType}/${stream}/${subject}/${chapter}/topic-${topic.id}/mcqs`} className="group bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-400 transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{topic.mcqs} Qs</span>
                                                </div>
                                                <h4 className="font-semibold text-slate-900 text-sm mb-2">MCQs Practice</h4>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${topic.completed.mcqs}%` }} />
                                                </div>
                                                <span className="text-xs text-slate-500 mt-1 block">{topic.completed.mcqs}% complete</span>
                                            </Link>

                                            <Link to={`/${examType}/${stream}/${subject}/${chapter}/topic-${topic.id}/notes`} className="group bg-white border border-emerald-200 rounded-lg p-4 hover:bg-emerald-50 hover:border-emerald-400 transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">PDF</span>
                                                </div>
                                                <h4 className="font-semibold text-slate-900 text-sm mb-2">Study Notes</h4>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${topic.completed.notes}%` }} />
                                                </div>
                                                <span className="text-xs text-slate-500 mt-1 block">{topic.completed.notes}% read</span>
                                            </Link>

                                            <Link to={`/${examType}/${stream}/${subject}/${chapter}/topic-${topic.id}/video`} className="group bg-white border border-violet-200 rounded-lg p-4 hover:bg-violet-50 hover:border-violet-400 transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Video</span>
                                                </div>
                                                <h4 className="font-semibold text-slate-900 text-sm mb-2">Video Lesson</h4>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-violet-600 rounded-full" style={{ width: `${topic.completed.video}%` }} />
                                                </div>
                                                <span className="text-xs text-slate-500 mt-1 block">{topic.completed.video}% watched</span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <aside>
                            <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-24">
                                <h3 className="font-semibold text-slate-900 mb-4">Chapter Overview</h3>

                                <div className="flex justify-center mb-5">
                                    <div className="relative w-28 h-28">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="56" cy="56" r="48" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                                            <circle cx="56" cy="56" r="48" stroke="#2563eb" strokeWidth="8" fill="none" strokeDasharray={`${overallProgress * 3.02} 302`} strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-slate-900">{overallProgress}%</div>
                                                <div className="text-xs text-slate-500">Complete</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-slate-700 mb-3">Legend</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded bg-blue-600" />
                                            <span className="text-slate-600">MCQs Practice</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded bg-emerald-600" />
                                            <span className="text-slate-600">Study Notes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded bg-violet-600" />
                                            <span className="text-slate-600">Video Lessons</span>
                                        </div>
                                    </div>
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

export default TopicsPage;
