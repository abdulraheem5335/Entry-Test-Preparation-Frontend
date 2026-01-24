import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// YouTube video mapping for each subject and topic
const videoDatabase = {
    mathematics: {
        "topic-1": { videoId: "NybHckSEQBI", title: "Linear Equations - Complete Tutorial", duration: "12:45" },
        "topic-2": { videoId: "i7idZfS8t8w", title: "Quadratic Equations Explained", duration: "15:30" },
        "topic-3": { videoId: "PvNYc-SfuGU", title: "Polynomial Equations", duration: "18:20" },
        "topic-4": { videoId: "vDqOL3NmAhI", title: "Systems of Equations", duration: "14:15" },
        "topic-5": { videoId: "FnII4nDBxWQ", title: "Inequalities - Complete Guide", duration: "11:40" },
        default: { videoId: "NybHckSEQBI", title: "Mathematics Fundamentals", duration: "12:00" }
    },
    physics: {
        "topic-1": { videoId: "ZM8ECpBuQYE", title: "Kinematics - Motion in One Dimension", duration: "16:20" },
        "topic-2": { videoId: "kKKM8Y-u7ds", title: "Newton's Laws of Motion", duration: "14:50" },
        "topic-3": { videoId: "w4QFJb9a8vo", title: "Work, Energy and Power", duration: "18:30" },
        "topic-4": { videoId: "XPUuF_dECVI", title: "Rotational Motion Explained", duration: "20:15" },
        "topic-5": { videoId: "TfYCnOvNnFU", title: "Oscillations and Waves", duration: "17:40" },
        default: { videoId: "ZM8ECpBuQYE", title: "Physics Fundamentals", duration: "15:00" }
    },
    english: {
        "topic-1": { videoId: "m5qXKoV0FEg", title: "Building Your Vocabulary", duration: "10:30" },
        "topic-2": { videoId: "N4vf8N6GpdM", title: "English Grammar Essentials", duration: "15:45" },
        "topic-3": { videoId: "dQw4w9WgXcQ", title: "Reading Comprehension Strategies", duration: "12:20" },
        "topic-4": { videoId: "8rlN8ffvrPI", title: "Sentence Correction Tips", duration: "11:15" },
        default: { videoId: "m5qXKoV0FEg", title: "English Skills", duration: "12:00" }
    },
    chemistry: {
        "topic-1": { videoId: "zOdF2dNV1n4", title: "Atomic Structure Explained", duration: "14:30" },
        "topic-2": { videoId: "QXT4OVM4vXI", title: "Chemical Bonding", duration: "16:20" },
        "topic-3": { videoId: "pKvo0XWZtjo", title: "States of Matter", duration: "13:45" },
        "topic-4": { videoId: "GwoX_BemwHs", title: "Thermochemistry", duration: "15:50" },
        default: { videoId: "zOdF2dNV1n4", title: "Chemistry Fundamentals", duration: "14:00" }
    },
    biology: {
        "topic-1": { videoId: "8IlzKri08kk", title: "Cell Structure and Function", duration: "18:20" },
        "topic-2": { videoId: "8m6hHRlKwxY", title: "Genetics - DNA and Heredity", duration: "20:15" },
        "topic-3": { videoId: "GhHOjC4oxh8", title: "Evolution and Natural Selection", duration: "16:40" },
        "topic-4": { videoId: "x7vylk75GmE", title: "Human Physiology", duration: "22:30" },
        default: { videoId: "8IlzKri08kk", title: "Biology Fundamentals", duration: "15:00" }
    }
};

const getVideoData = (subject, topic) => {
    const subjectVideos = videoDatabase[subject] || videoDatabase.mathematics;
    return subjectVideos[topic] || subjectVideos.default;
};

const getRelatedVideos = (subject) => {
    const related = {
        mathematics: [
            { id: 1, title: "Calculus - Differentiation Basics", duration: "18:30", videoId: "WUvTyaaNkzM" },
            { id: 2, title: "Trigonometry Complete Course", duration: "24:20", videoId: "PUB0TaZ7bhA" },
            { id: 3, title: "Algebra Practice Problems", duration: "12:15", videoId: "LwCRRUa8yTU" }
        ],
        physics: [
            { id: 1, title: "Electricity and Magnetism", duration: "20:15", videoId: "x1-SibwIPM4" },
            { id: 2, title: "Thermodynamics Explained", duration: "16:40", videoId: "fWHmApS51Dg" },
            { id: 3, title: "Modern Physics Introduction", duration: "14:30", videoId: "CBrsWPCp_rs" }
        ],
        english: [
            { id: 1, title: "Advanced Vocabulary", duration: "15:20", videoId: "B9ShF3AB-Rs" },
            { id: 2, title: "Essay Writing Tips", duration: "12:45", videoId: "nNV9HPCc1Qw" },
            { id: 3, title: "Common Grammar Mistakes", duration: "10:30", videoId: "oBNMTcAzIh0" }
        ],
        chemistry: [
            { id: 1, title: "Organic Chemistry Basics", duration: "22:30", videoId: "bka20Q9TN6M" },
            { id: 2, title: "Periodic Table Explained", duration: "15:45", videoId: "fPnwBITSmgU" },
            { id: 3, title: "Chemical Reactions", duration: "18:20", videoId: "eNsVaUCzvLA" }
        ],
        biology: [
            { id: 1, title: "Human Body Systems", duration: "25:30", videoId: "Ae4MadKPJC0" },
            { id: 2, title: "Plant Biology", duration: "14:20", videoId: "uixA8ZXx0KU" },
            { id: 3, title: "Ecology and Environment", duration: "16:45", videoId: "GlWNuzrqe7U" }
        ]
    };
    return related[subject] || related.mathematics;
};

const VideoPlayer = () => {
    const { stream, subject, chapter, topic } = useParams();
    const navigate = useNavigate();
    const [showTips, setShowTips] = useState(false);
    const [isMarkedWatched, setIsMarkedWatched] = useState(false);
    const [notes, setNotes] = useState("");

    const formatName = (str) => str?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '';

    const videoData = getVideoData(subject, topic);
    const relatedVideos = getRelatedVideos(subject);

    const getTopicDescription = () => {
        const descriptions = {
            mathematics: "Learn mathematical concepts with clear explanations and worked examples. Perfect for exam preparation.",
            physics: "Master physics fundamentals with visual demonstrations and problem-solving techniques.",
            english: "Improve your English language skills with comprehensive lessons and practice exercises.",
            chemistry: "Understand chemical concepts through detailed explanations and real-world applications.",
            biology: "Explore biological systems with engaging visuals and in-depth explanations."
        };
        return descriptions[subject] || "Comprehensive video lesson for your exam preparation.";
    };

    // Determine which exam type based on URL
    const getExamType = () => {
        if (window.location.pathname.includes('/mdcat')) return 'mdcat';
        if (window.location.pathname.includes('/nat')) return 'nat';
        return 'net';
    };

    const examType = getExamType();

    const handleBack = () => {
        navigate(`/${examType}/${stream}/${subject}/${chapter}`);
    };

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button onClick={handleBack} className="p-2 rounded-lg hover:bg-slate-100 transition">
                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="font-semibold text-slate-900">Video Lesson</h1>
                            <p className="text-sm text-slate-500">{formatName(subject)} • {formatName(topic)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                    {/* Video Player Section */}
                    <div>
                        {/* YouTube Embed */}
                        <div className="bg-slate-900 rounded-xl overflow-hidden mb-6 aspect-video shadow-lg">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoData.videoId}?rel=0&modestbranding=1`}
                                title={videoData.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Video Info */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
                            <h1 className="text-xl font-semibold text-slate-900 mb-2">{videoData.title}</h1>
                            <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                                <span>Duration: {videoData.duration}</span>
                                <span>•</span>
                                <span>{formatName(subject)}</span>
                                <span>•</span>
                                <span>{formatName(topic)}</span>
                            </div>
                            <p className="text-slate-600 text-sm mb-5">{getTopicDescription()}</p>

                            {/* Key Learning Points */}
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">
                                <h3 className="font-medium text-blue-900 text-sm mb-3">What You'll Learn</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-sm text-blue-800">
                                        <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Core concepts and fundamental principles
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-blue-800">
                                        <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Step-by-step problem solving techniques
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-blue-800">
                                        <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Common exam patterns and tips
                                    </li>
                                    <li className="flex items-start gap-2 text-sm text-blue-800">
                                        <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Practice examples with solutions
                                    </li>
                                </ul>
                            </div>

                            {/* Mark as Watched */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setIsMarkedWatched(!isMarkedWatched)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isMarkedWatched ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    {isMarkedWatched ? '✓ Marked as Watched' : 'Mark as Watched'}
                                </button>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <button
                                onClick={() => setShowTips(!showTips)}
                                className="w-full px-5 py-4 flex items-center justify-between text-slate-900 hover:bg-slate-50 transition"
                            >
                                <span className="font-medium text-sm">Study Tips for This Topic</span>
                                <svg className={`w-5 h-5 transition-transform ${showTips ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showTips && (
                                <div className="px-5 py-4 border-t border-slate-200 bg-slate-50">
                                    <ul className="space-y-3 text-sm text-slate-600">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium">1.</span>
                                            Watch the video completely before taking notes
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium">2.</span>
                                            Pause and replay complex sections
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium">3.</span>
                                            Practice the examples shown in the video
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium">4.</span>
                                            Test yourself with MCQs after watching
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 font-medium">5.</span>
                                            Review the notes section for quick reference
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-5">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <h3 className="font-medium text-slate-900 text-sm mb-4">Continue Learning</h3>
                            <div className="space-y-2">
                                <Link
                                    to={`/${examType}/${stream}/${subject}/${chapter}/${topic}/mcqs`}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 transition"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-medium text-sm">Practice MCQs</span>
                                        <p className="text-xs text-slate-500">Test your understanding</p>
                                    </div>
                                </Link>
                                <Link
                                    to={`/${examType}/${stream}/${subject}/${chapter}/${topic}/notes`}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-medium text-sm">Read Notes</span>
                                        <p className="text-xs text-slate-500">Detailed study material</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <h3 className="font-medium text-slate-900 text-sm mb-3">My Notes</h3>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Take notes while watching..."
                                className="w-full h-28 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 placeholder-slate-400 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Related Videos */}
                        <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <h3 className="font-medium text-slate-900 text-sm mb-4">Related Videos</h3>
                            <div className="space-y-3">
                                {relatedVideos.map((video) => (
                                    <a
                                        key={video.id}
                                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition"
                                    >
                                        <div className="w-14 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-slate-900 text-sm font-medium line-clamp-1">{video.title}</h4>
                                            <span className="text-slate-500 text-xs">{video.duration}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default VideoPlayer;
