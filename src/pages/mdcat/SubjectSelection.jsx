import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";

// MDCAT Subject data
const streamSubjects = {
    "mdcat-pre-medical": {
        name: "MDCAT Pre-Medical",
        description: "For MBBS, BDS, Nursing and other medical programs",
        subjects: [
            {
                id: "biology",
                name: "Biology",
                image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
                description: "Master cell biology, genetics, physiology, and ecology",
                chapters: 18,
                progress: 35,
                difficulty: "Hard",
                weight: 40
            },
            {
                id: "chemistry",
                name: "Chemistry",
                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
                description: "Learn organic, inorganic, and physical chemistry",
                chapters: 16,
                progress: 40,
                difficulty: "Hard",
                weight: 30
            },
            {
                id: "physics",
                name: "Physics",
                image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80",
                description: "Learn mechanics, waves, and modern physics concepts",
                chapters: 12,
                progress: 25,
                difficulty: "Medium",
                weight: 20
            },
            {
                id: "english",
                name: "English",
                image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80",
                description: "Improve vocabulary, grammar, and comprehension skills",
                chapters: 8,
                progress: 55,
                difficulty: "Easy",
                weight: 10
            }
        ]
    }
};

const SubjectSelection = () => {
    const { stream } = useParams();
    const [sortBy, setSortBy] = useState("default");
    const [searchQuery, setSearchQuery] = useState("");

    const streamData = streamSubjects[stream] || streamSubjects["mdcat-pre-medical"];

    const overallProgress = useMemo(() => {
        const subjects = streamData.subjects;
        const total = subjects.reduce((acc, sub) => acc + sub.progress, 0);
        return Math.round(total / subjects.length);
    }, [streamData]);

    const filteredSubjects = useMemo(() => {
        let subjects = [...streamData.subjects];
        if (searchQuery) {
            subjects = subjects.filter(s =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        switch (sortBy) {
            case "difficulty":
                const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
                subjects.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
                break;
            case "progress":
                subjects.sort((a, b) => b.progress - a.progress);
                break;
            case "alphabetical":
                subjects.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }
        return subjects;
    }, [streamData, sortBy, searchQuery]);

    const getDifficultyStyle = (difficulty) => {
        switch (difficulty) {
            case "Easy": return "bg-emerald-50 text-emerald-700 border border-emerald-200";
            case "Medium": return "bg-amber-50 text-amber-700 border border-amber-200";
            case "Hard": return "bg-rose-50 text-rose-700 border border-rose-200";
            default: return "bg-slate-50 text-slate-700 border border-slate-200";
        }
    };

    return (
        <>
            <main className="min-h-screen bg-slate-50">
                {/* Header Section */}
                <div className="bg-white border-b border-slate-200">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                            <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
                            <span className="text-slate-300">/</span>
                            <Link to="/mdcat" className="hover:text-emerald-600 transition">MDCAT Preparation</Link>
                            <span className="text-slate-300">/</span>
                            <span className="text-slate-900 font-medium">{streamData.name}</span>
                        </nav>

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{streamData.name}</h1>
                                <p className="text-slate-600">{streamData.description}</p>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 min-w-[260px]">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-emerald-900">Overall Progress</span>
                                    <span className="text-2xl font-bold text-emerald-600">{overallProgress}%</span>
                                </div>
                                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }} />
                                </div>
                                <p className="text-xs text-emerald-700 mt-2">
                                    {streamData.subjects.length} subjects • {streamData.subjects.reduce((a, s) => a + s.chapters, 0)} total chapters
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Search subjects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-sm"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-600">Sort by:</span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition cursor-pointer text-sm">
                                <option value="default">Default</option>
                                <option value="difficulty">Difficulty</option>
                                <option value="progress">Progress</option>
                                <option value="alphabetical">Alphabetical</option>
                            </select>
                        </div>
                    </div>

                    {/* Subject Weightage Section */}
                    <div className="mb-10 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Subject Weightage in MDCAT</h3>
                                <p className="text-sm text-slate-500">Focus on subjects with higher weightage for better scores</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {streamData.subjects.map((subject) => (
                                <div key={subject.id} className="relative flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all">
                                    <div className="relative w-20 h-20 mb-3">
                                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                                            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#d1fae5" strokeWidth="3" />
                                            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${subject.weight} ${100 - subject.weight}`} strokeLinecap="round" className="transition-all duration-700" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xl font-bold text-slate-900">{subject.weight}%</span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 text-center">{subject.name}</span>
                                    <span className="text-xs text-slate-400 mt-1">{subject.chapters} chapters</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredSubjects.map((subject) => (
                            <article key={subject.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group">
                                <div className="relative h-36 overflow-hidden">
                                    <img src={subject.image} alt={subject.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyStyle(subject.difficulty)}`}>
                                        {subject.difficulty}
                                    </span>
                                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/90 text-xs font-medium text-slate-700">
                                        {subject.weight} weightage
                                    </span>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{subject.name}</h3>
                                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">{subject.description}</p>

                                    <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <span>{subject.chapters} Chapters</span>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-500">Progress</span>
                                            <span className="font-semibold text-slate-900">{subject.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${subject.progress}%` }} />
                                        </div>
                                    </div>

                                    <Link
                                        to={`/mdcat/${stream}/${subject.id}`}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                                    >
                                        {subject.progress > 0 ? "Continue" : "Start"}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SubjectSelection;
