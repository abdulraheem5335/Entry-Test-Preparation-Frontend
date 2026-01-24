import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

// Subject-specific notes content
const notesDatabase = {
    mathematics: {
        title: "Linear Equations",
        readTime: "15 min read",
        sections: [
            {
                id: "introduction",
                title: "Introduction",
                content: `A linear equation is an equation that forms a straight line when graphed. It has constant coefficients and the highest power of the variable is 1.

The general form of a linear equation in one variable is:
**ax + b = 0** (where a ≠ 0)

The general form of a linear equation in two variables is:
**ax + by + c = 0** (where a and b are not both zero)`
            },
            {
                id: "standard-forms",
                title: "Standard Forms",
                content: `There are several standard forms of linear equations:

**1. Slope-Intercept Form:**
y = mx + b
- m = slope
- b = y-intercept

**2. Point-Slope Form:**
y - y₁ = m(x - x₁)
- (x₁, y₁) = a point on the line
- m = slope

**3. Standard Form:**
Ax + By = C
- A, B, C are integers
- A should be non-negative`
            },
            {
                id: "solving-methods",
                title: "Methods of Solving",
                content: `**Method 1: Isolation**
Move all terms with the variable to one side and constants to the other.

Example: 3x + 5 = 17
Step 1: 3x = 17 - 5
Step 2: 3x = 12
Step 3: x = 4

**Method 2: Cross Multiplication**
For equations of the form a/b = c/d:
ad = bc

**Method 3: Substitution**
Used for systems of equations - express one variable in terms of another.`
            },
            {
                id: "key-points",
                title: "Key Takeaways",
                content: `Remember these key points:

1. Linear equations have degree 1
2. The graph is always a straight line
3. One variable equations have exactly one solution
4. Two variable equations have infinitely many solutions
5. Systems can have one, none, or infinite solutions`
            }
        ]
    },
    physics: {
        title: "Newton's Laws of Motion",
        readTime: "18 min read",
        sections: [
            { id: "introduction", title: "Introduction", content: `Newton's Laws of Motion are three physical laws that form the foundation of classical mechanics. They describe the relationship between a body and the forces acting upon it.\n\n**Sir Isaac Newton** published these laws in 1687 in his work "Philosophiæ Naturalis Principia Mathematica".` },
            { id: "first-law", title: "First Law (Law of Inertia)", content: `**Statement:** An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.\n\n**Key Concepts:**\n- Inertia is the tendency of an object to resist changes in motion\n- Mass is a measure of inertia\n- No net force = no acceleration` },
            { id: "second-law", title: "Second Law (Law of Acceleration)", content: `**Statement:** The acceleration of an object is directly proportional to the net force and inversely proportional to its mass.\n\n**Mathematical Form:**\n**F = ma**\n\nWhere:\n- F = Force (in Newtons)\n- m = Mass (in kg)\n- a = Acceleration (in m/s²)` },
            { id: "third-law", title: "Third Law (Action-Reaction)", content: `**Statement:** For every action, there is an equal and opposite reaction.\n\n**Key Points:**\n- Action and reaction forces act on different objects\n- They are equal in magnitude but opposite in direction\n- They occur simultaneously` }
        ]
    },
    english: {
        title: "Grammar Essentials",
        readTime: "12 min read",
        sections: [
            { id: "introduction", title: "Introduction", content: `Grammar is the system of rules that defines the structure of a language. Understanding grammar is essential for clear communication and success in competitive exams.` },
            { id: "parts-of-speech", title: "Parts of Speech", content: `There are **8 parts of speech** in English:\n\n**1. Noun** - Names a person, place, thing, or idea\n**2. Pronoun** - Replaces a noun\n**3. Verb** - Shows action or state of being\n**4. Adjective** - Describes a noun\n**5. Adverb** - Modifies verbs, adjectives, or other adverbs\n**6. Preposition** - Shows relationship between words\n**7. Conjunction** - Connects words or clauses\n**8. Interjection** - Expresses emotion` },
            { id: "tenses", title: "Tenses", content: `There are **12 tenses** in English (3 main × 4 aspects):\n\n**Present:** Simple, Continuous, Perfect, Perfect Continuous\n**Past:** Simple, Continuous, Perfect, Perfect Continuous\n**Future:** Simple, Continuous, Perfect, Perfect Continuous` },
            { id: "common-errors", title: "Common Errors", content: `**Avoid these common mistakes:**\n\n1. Subject-Verb Agreement\n2. Pronoun-Antecedent Agreement\n3. Misplaced Modifiers\n4. Run-on Sentences` }
        ]
    },
    chemistry: {
        title: "Atomic Structure",
        readTime: "16 min read",
        sections: [
            { id: "introduction", title: "Introduction", content: `The atom is the basic unit of matter. Understanding atomic structure is fundamental to chemistry.\n\n**Key Historical Models:**\n- Dalton's Model (Solid Sphere)\n- Thomson's Model (Plum Pudding)\n- Rutherford's Model (Nuclear)\n- Bohr's Model (Planetary)` },
            { id: "subatomic-particles", title: "Subatomic Particles", content: `**Proton (p⁺)** - Positive charge, in nucleus\n**Neutron (n⁰)** - No charge, in nucleus\n**Electron (e⁻)** - Negative charge, in shells` },
            { id: "atomic-number", title: "Atomic Number and Mass Number", content: `**Atomic Number (Z)** - Number of protons\n**Mass Number (A)** - Protons + Neutrons\n\n**Isotopes:** Same atomic number, different mass numbers` },
            { id: "electron-configuration", title: "Electron Configuration", content: `Electrons are arranged in shells around the nucleus.\n\n**Shell Capacity:** 2n²\n**Order of filling:** 1s → 2s → 2p → 3s → 3p → 4s → 3d...` }
        ]
    },
    biology: {
        title: "Cell Biology",
        readTime: "20 min read",
        sections: [
            { id: "introduction", title: "Introduction", content: `The cell is the basic structural and functional unit of all living organisms.\n\n**Cell Theory:**\n1. All living organisms are composed of cells\n2. The cell is the basic unit of life\n3. All cells arise from pre-existing cells` },
            { id: "cell-types", title: "Types of Cells", content: `**Prokaryotic Cells** - No true nucleus (Bacteria)\n**Eukaryotic Cells** - True nucleus (Plants, Animals, Fungi)` },
            { id: "organelles", title: "Cell Organelles", content: `**Nucleus** - Control center\n**Mitochondria** - Powerhouse\n**Ribosomes** - Protein synthesis\n**Chloroplasts** - Photosynthesis (plants)` },
            { id: "cell-division", title: "Cell Division", content: `**Mitosis** - Somatic cell division (2 identical cells)\n**Meiosis** - Gamete formation (4 haploid cells)` }
        ]
    }
};

const getNotes = (subject) => notesDatabase[subject] || notesDatabase.mathematics;

const NotesViewer = () => {
    const { stream, subject, chapter, topic } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const examType = location.pathname.includes('/mdcat') ? 'mdcat' : location.pathname.includes('/nat') ? 'nat' : 'net';

    const [fontSize, setFontSize] = useState(16);
    const [readingProgress, setReadingProgress] = useState(0);
    const [isMarkedComplete, setIsMarkedComplete] = useState(false);
    const [activeSection, setActiveSection] = useState("introduction");

    const formatName = (str) => str?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '';
    const notesContent = getNotes(subject);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setReadingProgress(Math.min(100, Math.max(0, progress)));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleBack = () => navigate(`/${examType}/${stream}/${subject}/${chapter}`);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${readingProgress}%` }} />
            </div>

            {/* Header */}
            <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
                <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-slate-100 transition">
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="font-semibold text-slate-900">Study Notes</h1>
                                <p className="text-sm text-slate-500">{formatName(subject)} • {formatName(topic)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-100">
                                <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="px-2 py-1 rounded hover:bg-slate-200 text-slate-600">
                                    <span className="text-xs font-medium">A-</span>
                                </button>
                                <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} className="px-2 py-1 rounded hover:bg-slate-200 text-slate-600">
                                    <span className="text-sm font-medium">A+</span>
                                </button>
                            </div>
                            <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="hidden lg:block sticky top-24 h-fit bg-white border-slate-200 rounded-xl border p-5">
                        <h3 className="font-semibold mb-4 text-sm text-slate-900">Contents</h3>
                        <nav className="space-y-1">
                            {notesContent.sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === section.id
                                            ? 'bg-emerald-50 text-emerald-700 border-l-2 border-emerald-600'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h4 className="font-medium mb-3 text-sm text-slate-900">Continue With</h4>
                            <div className="space-y-2">
                                <Link to={`/${examType}/${stream}/${subject}/${chapter}/${topic}/mcqs`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    Practice MCQs
                                </Link>
                                <Link to={`/${examType}/${stream}/${subject}/${chapter}/${topic}/video`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition">
                                    <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Watch Video
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="bg-white border-slate-200 rounded-xl border overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                                    {formatName(subject)}
                                </span>
                                <span className="text-sm text-slate-500">• {notesContent.readTime}</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900">{notesContent.title}</h1>
                        </div>

                        <div className="px-6 py-6" style={{ fontSize: `${fontSize}px` }}>
                            {notesContent.sections.map((section) => (
                                <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b text-slate-900 border-slate-200">
                                        {section.title}
                                    </h2>
                                    <div>
                                        {section.content.split('\n\n').map((paragraph, idx) => (
                                            <p key={idx} className="mb-4 leading-relaxed whitespace-pre-line text-slate-700">
                                                {paragraph.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={i} className="text-slate-900">{part.slice(2, -2)}</strong>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <div className="px-6 py-5 border-t border-slate-200 bg-slate-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMarkedComplete ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                        {isMarkedComplete ? (
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm text-slate-900">
                                            {isMarkedComplete ? 'Completed!' : 'Finished reading?'}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            {isMarkedComplete ? 'Great job!' : 'Mark as complete when done.'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsMarkedComplete(!isMarkedComplete)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isMarkedComplete ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                                >
                                    {isMarkedComplete ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NotesViewer;
