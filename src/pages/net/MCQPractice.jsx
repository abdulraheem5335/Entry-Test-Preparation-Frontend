import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Subject-specific MCQ databases
const questionDatabase = {
    mathematics: [
        { question: "What is the solution to the equation 2x + 5 = 13?", options: ["x = 3", "x = 4", "x = 5", "x = 6"], correctAnswer: 1, explanation: "Subtracting 5 from both sides: 2x = 8. Dividing by 2: x = 4." },
        { question: "Which of the following is a quadratic equation?", options: ["2x + 3 = 0", "x² + 5x + 6 = 0", "x³ + 2x = 0", "1/x + 2 = 0"], correctAnswer: 1, explanation: "A quadratic equation has the highest power of the variable as 2." },
        { question: "The roots of the equation x² - 5x + 6 = 0 are:", options: ["2 and 3", "1 and 6", "-2 and -3", "2 and -3"], correctAnswer: 0, explanation: "Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3." },
        { question: "If 3(x - 2) = 12, what is the value of x?", options: ["2", "4", "6", "8"], correctAnswer: 2, explanation: "3(x - 2) = 12 → x - 2 = 4 → x = 6" },
        { question: "The discriminant of ax² + bx + c = 0 is:", options: ["b² - 4ac", "b² + 4ac", "4ac - b²", "a² - 4bc"], correctAnswer: 0, explanation: "The discriminant D = b² - 4ac determines the nature of roots." },
        { question: "What is the sum of roots of x² - 7x + 12 = 0?", options: ["7", "-7", "12", "-12"], correctAnswer: 0, explanation: "For ax² + bx + c = 0, sum of roots = -b/a = -(-7)/1 = 7" },
        { question: "Solve: |x - 3| = 5", options: ["x = 8 or x = -2", "x = 8 only", "x = -2 only", "x = 2 or x = 8"], correctAnswer: 0, explanation: "|x - 3| = 5 means x - 3 = 5 or x - 3 = -5, so x = 8 or x = -2" },
        { question: "The equation x² + 4 = 0 has:", options: ["Two real roots", "One real root", "No real roots", "Infinite roots"], correctAnswer: 2, explanation: "x² = -4 has no real solution since square of a real number cannot be negative." },
        { question: "If 2^x = 32, then x equals:", options: ["4", "5", "6", "8"], correctAnswer: 1, explanation: "2^5 = 32, so x = 5" },
        { question: "The product of roots of 2x² + 3x - 5 = 0 is:", options: ["5/2", "-5/2", "3/2", "-3/2"], correctAnswer: 1, explanation: "For ax² + bx + c = 0, product of roots = c/a = -5/2" },
        { question: "What is the value of sin²θ + cos²θ?", options: ["0", "1", "2", "θ"], correctAnswer: 1, explanation: "This is the fundamental Pythagorean identity." },
        { question: "The derivative of x³ is:", options: ["x²", "3x²", "3x", "x³"], correctAnswer: 1, explanation: "Using power rule: d/dx(x³) = 3x²" },
        { question: "∫ 2x dx equals:", options: ["x²", "x² + C", "2x² + C", "x + C"], correctAnswer: 1, explanation: "∫ 2x dx = 2(x²/2) + C = x² + C" },
        { question: "log₁₀(100) equals:", options: ["1", "2", "10", "100"], correctAnswer: 1, explanation: "10² = 100, so log₁₀(100) = 2" },
        { question: "The slope of a horizontal line is:", options: ["0", "1", "Undefined", "Infinity"], correctAnswer: 0, explanation: "A horizontal line has no rise, so slope = rise/run = 0" }
    ],
    physics: [
        { question: "The SI unit of force is:", options: ["Joule", "Newton", "Watt", "Pascal"], correctAnswer: 1, explanation: "Force is measured in Newtons (N) in SI system." },
        { question: "Acceleration due to gravity on Earth is approximately:", options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "11.8 m/s²"], correctAnswer: 1, explanation: "g ≈ 9.8 m/s² on Earth's surface." },
        { question: "Newton's First Law is also known as:", options: ["Law of Acceleration", "Law of Inertia", "Law of Reaction", "Law of Gravity"], correctAnswer: 1, explanation: "The First Law states that objects resist changes in motion (inertia)." },
        { question: "Kinetic Energy is given by:", options: ["mgh", "½mv²", "mv", "ma"], correctAnswer: 1, explanation: "KE = ½mv² where m is mass and v is velocity." },
        { question: "The unit of power is:", options: ["Joule", "Newton", "Watt", "Pascal"], correctAnswer: 2, explanation: "Power is measured in Watts (W) = Joules/second" },
        { question: "Speed of light in vacuum is approximately:", options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"], correctAnswer: 1, explanation: "c ≈ 3 × 10⁸ m/s" },
        { question: "According to Ohm's Law, V = ?", options: ["IR", "I/R", "R/I", "I + R"], correctAnswer: 0, explanation: "Ohm's Law: Voltage = Current × Resistance" },
        { question: "The SI unit of electric current is:", options: ["Volt", "Ohm", "Ampere", "Watt"], correctAnswer: 2, explanation: "Electric current is measured in Amperes (A)." },
        { question: "Momentum is defined as:", options: ["Mass × Acceleration", "Mass × Velocity", "Force × Time", "Energy × Time"], correctAnswer: 1, explanation: "p = mv (momentum = mass × velocity)" },
        { question: "The unit of frequency is:", options: ["Second", "Hertz", "Meter", "Joule"], correctAnswer: 1, explanation: "Frequency is measured in Hertz (Hz) = cycles per second" },
        { question: "Work done when force is perpendicular to displacement is:", options: ["Maximum", "Zero", "Negative", "Positive"], correctAnswer: 1, explanation: "W = F.d.cosθ, when θ = 90°, cos90° = 0, so W = 0" },
        { question: "Which type of mirror is used in vehicles for rear view?", options: ["Plane", "Concave", "Convex", "None"], correctAnswer: 2, explanation: "Convex mirrors provide wider field of view." },
        { question: "Transformer works on the principle of:", options: ["Electromagnetic induction", "Self induction", "Mutual induction", "Electrolysis"], correctAnswer: 2, explanation: "Transformers use mutual induction between coils." },
        { question: "The escape velocity from Earth is approximately:", options: ["8 km/s", "11.2 km/s", "15 km/s", "25 km/s"], correctAnswer: 1, explanation: "Escape velocity from Earth ≈ 11.2 km/s" },
        { question: "In a nuclear reactor, moderator is used to:", options: ["Speed up neutrons", "Slow down neutrons", "Absorb neutrons", "Reflect neutrons"], correctAnswer: 1, explanation: "Moderators slow down fast neutrons for fission." }
    ],
    english: [
        { question: "Choose the correct spelling:", options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"], correctAnswer: 1, explanation: "Accommodate has double 'c' and double 'm'." },
        { question: "The synonym of 'Eloquent' is:", options: ["Silent", "Articulate", "Dumb", "Shy"], correctAnswer: 1, explanation: "Eloquent means fluent or persuasive in speaking." },
        { question: "The antonym of 'Benevolent' is:", options: ["Kind", "Generous", "Malevolent", "Helpful"], correctAnswer: 2, explanation: "Benevolent means kind, malevolent means wishing evil." },
        { question: "Which is a collective noun?", options: ["Dog", "Running", "Flock", "Beautiful"], correctAnswer: 2, explanation: "Flock is a collective noun (group of birds/sheep)." },
        { question: "'She has been working since morning' is in which tense?", options: ["Present Perfect", "Present Perfect Continuous", "Past Perfect", "Simple Present"], correctAnswer: 1, explanation: "Has been + verb-ing = Present Perfect Continuous" },
        { question: "The passive voice of 'He writes a letter' is:", options: ["A letter is written by him", "A letter was written by him", "A letter is being written", "He is writing a letter"], correctAnswer: 0, explanation: "Active (writes) → Passive (is written)" },
        { question: "Choose the correct article: ___ European came to see me.", options: ["A", "An", "The", "No article"], correctAnswer: 0, explanation: "European starts with 'Yu' sound, so we use 'A'." },
        { question: "The meaning of 'Ubiquitous' is:", options: ["Rare", "Present everywhere", "Absent", "Unknown"], correctAnswer: 1, explanation: "Ubiquitous means present, appearing, or found everywhere." },
        { question: "Which sentence is correct?", options: ["He is more taller than me", "He is taller than me", "He is most taller than me", "He is tallest than me"], correctAnswer: 1, explanation: "Comparative form: taller (not more taller)." },
        { question: "An idiom meaning 'to die' is:", options: ["Break a leg", "Kick the bucket", "Hit the road", "Under the weather"], correctAnswer: 1, explanation: "'Kick the bucket' is an idiom meaning to die." },
        { question: "The plural of 'Criterion' is:", options: ["Criterions", "Criteria", "Criterias", "Criterion"], correctAnswer: 1, explanation: "Criterion → Criteria (Greek origin)" },
        { question: "Choose the correct preposition: She is afraid ___ spiders.", options: ["from", "of", "by", "to"], correctAnswer: 1, explanation: "Afraid of (preposition collocation)" },
        { question: "'Neither...nor' is used for:", options: ["Addition", "Contrast", "Two negatives", "Comparison"], correctAnswer: 2, explanation: "Neither...nor connects two negative alternatives." },
        { question: "The word 'Ambiguous' means:", options: ["Clear", "Uncertain", "Definite", "Obvious"], correctAnswer: 1, explanation: "Ambiguous means open to more than one interpretation." },
        { question: "Identify the adverb: 'She speaks softly.'", options: ["She", "speaks", "softly", "None"], correctAnswer: 2, explanation: "Softly describes how she speaks (manner adverb)." }
    ],
    chemistry: [
        { question: "The atomic number of Carbon is:", options: ["4", "6", "8", "12"], correctAnswer: 1, explanation: "Carbon has 6 protons in its nucleus." },
        { question: "pH of pure water at 25°C is:", options: ["0", "7", "14", "1"], correctAnswer: 1, explanation: "Pure water is neutral with pH = 7." },
        { question: "Which gas is used in photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 1, explanation: "Plants absorb CO₂ during photosynthesis." },
        { question: "The chemical formula of table salt is:", options: ["NaCl", "KCl", "CaCl₂", "MgCl₂"], correctAnswer: 0, explanation: "Sodium Chloride (NaCl) is common table salt." },
        { question: "Avogadro's number is approximately:", options: ["6.022 × 10²³", "6.022 × 10²²", "6.022 × 10²⁴", "3.14 × 10²³"], correctAnswer: 0, explanation: "Avogadro's constant ≈ 6.022 × 10²³ mol⁻¹" },
        { question: "The lightest element is:", options: ["Helium", "Hydrogen", "Lithium", "Carbon"], correctAnswer: 1, explanation: "Hydrogen with atomic mass ≈ 1 is the lightest." },
        { question: "Which is a noble gas?", options: ["Oxygen", "Nitrogen", "Argon", "Chlorine"], correctAnswer: 2, explanation: "Argon belongs to Group 18 (noble gases)." },
        { question: "Rusting of iron is an example of:", options: ["Physical change", "Chemical change", "No change", "Nuclear change"], correctAnswer: 1, explanation: "Rusting involves oxidation (chemical reaction)." },
        { question: "The nucleus of an atom contains:", options: ["Electrons only", "Protons only", "Protons and neutrons", "Electrons and protons"], correctAnswer: 2, explanation: "The nucleus contains protons and neutrons." },
        { question: "Which bond is formed by sharing electrons?", options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"], correctAnswer: 1, explanation: "Covalent bonds form by electron sharing." },
        { question: "The molecular formula of glucose is:", options: ["C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "CH₄", "C₂H₅OH"], correctAnswer: 0, explanation: "Glucose has formula C₆H₁₂O₆" },
        { question: "Which is the most electronegative element?", options: ["Oxygen", "Nitrogen", "Fluorine", "Chlorine"], correctAnswer: 2, explanation: "Fluorine has the highest electronegativity." },
        { question: "Isotopes differ in number of:", options: ["Protons", "Electrons", "Neutrons", "Nucleons"], correctAnswer: 2, explanation: "Isotopes have same protons but different neutrons." },
        { question: "The SI unit of amount of substance is:", options: ["Gram", "Kilogram", "Mole", "Atom"], correctAnswer: 2, explanation: "Mole is the SI unit for amount of substance." },
        { question: "Which acid is found in vinegar?", options: ["Hydrochloric acid", "Sulfuric acid", "Acetic acid", "Citric acid"], correctAnswer: 2, explanation: "Vinegar contains acetic acid (CH₃COOH)." }
    ],
    biology: [
        { question: "The powerhouse of the cell is:", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], correctAnswer: 2, explanation: "Mitochondria produce ATP through cellular respiration." },
        { question: "DNA stands for:", options: ["Deoxyribonucleic acid", "Diribonucleic acid", "Deoxyribose acid", "None of these"], correctAnswer: 0, explanation: "DNA = Deoxyribonucleic acid" },
        { question: "The basic unit of life is:", options: ["Tissue", "Organ", "Cell", "Organism"], correctAnswer: 2, explanation: "Cell is the fundamental unit of all living organisms." },
        { question: "Photosynthesis takes place in:", options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"], correctAnswer: 1, explanation: "Chloroplasts contain chlorophyll for photosynthesis." },
        { question: "The largest organ in human body is:", options: ["Heart", "Liver", "Skin", "Brain"], correctAnswer: 2, explanation: "Skin is the largest organ by surface area." },
        { question: "Blood is filtered by:", options: ["Heart", "Lungs", "Kidneys", "Liver"], correctAnswer: 2, explanation: "Kidneys filter blood and produce urine." },
        { question: "The number of chromosomes in human cells is:", options: ["23", "46", "44", "48"], correctAnswer: 1, explanation: "Humans have 46 chromosomes (23 pairs)." },
        { question: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"], correctAnswer: 2, explanation: "UV light triggers Vitamin D synthesis in skin." },
        { question: "The study of heredity is called:", options: ["Ecology", "Genetics", "Anatomy", "Physiology"], correctAnswer: 1, explanation: "Genetics is the study of genes and heredity." },
        { question: "Red blood cells are produced in:", options: ["Heart", "Liver", "Bone marrow", "Spleen"], correctAnswer: 2, explanation: "RBCs are produced in bone marrow." },
        { question: "The process of cell division is called:", options: ["Osmosis", "Mitosis", "Photosynthesis", "Respiration"], correctAnswer: 1, explanation: "Mitosis is the process of cell division." },
        { question: "Which part of the brain controls balance?", options: ["Cerebrum", "Cerebellum", "Medulla", "Pons"], correctAnswer: 1, explanation: "Cerebellum coordinates balance and movement." },
        { question: "Insulin is produced by:", options: ["Liver", "Pancreas", "Thyroid", "Kidney"], correctAnswer: 1, explanation: "Pancreas produces insulin to regulate blood sugar." },
        { question: "The normal human body temperature is:", options: ["36°C", "37°C", "38°C", "39°C"], correctAnswer: 1, explanation: "Normal body temperature is approximately 37°C (98.6°F)." },
        { question: "Which blood type is the universal donor?", options: ["A", "B", "AB", "O"], correctAnswer: 3, explanation: "Type O negative is the universal donor." }
    ]
};

// Default to mathematics if subject not found
const getQuestions = (subject) => {
    return questionDatabase[subject] || questionDatabase.mathematics;
};

const MCQPractice = () => {
    const { stream, subject, chapter, topic } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Detect exam type from URL
    const examType = location.pathname.includes('/mdcat') ? 'mdcat' : location.pathname.includes('/nat') ? 'nat' : 'net';

    // Get questions based on subject
    const allQuestions = getQuestions(subject);

    // Quiz Setup State
    const [quizStarted, setQuizStarted] = useState(false);
    const [selectedQuestionCount, setSelectedQuestionCount] = useState(5);
    const [selectedTimeLimit, setSelectedTimeLimit] = useState(10);

    // Quiz State
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const formatName = (str) => str?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || '';

    const handleBack = () => {
        navigate(`/${examType}/${stream}/${subject}/${chapter}`);
    };

    const startQuiz = () => {
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, selectedQuestionCount));
        setTimeLeft(selectedTimeLimit * 60);
        setQuizStarted(true);
    };

    // Timer
    useEffect(() => {
        if (!quizStarted || isSubmitted) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quizStarted, isSubmitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (optionIndex) => {
        if (isSubmitted) return;
        setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
        setShowExplanation(true);
    };

    const toggleMarkForReview = () => {
        setMarkedForReview(prev =>
            prev.includes(currentQuestion)
                ? prev.filter(q => q !== currentQuestion)
                : [...prev, currentQuestion]
        );
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleRetry = () => {
        setQuizStarted(false);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setMarkedForReview([]);
        setShowExplanation(false);
        setIsSubmitted(false);
    };

    const score = useMemo(() => {
        if (!questions.length) return 0;
        let correct = 0;
        questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctAnswer) correct++;
        });
        return correct;
    }, [selectedAnswers, questions]);

    const getQuestionStatus = (idx) => {
        if (markedForReview.includes(idx)) return "review";
        if (selectedAnswers[idx] !== undefined) return "answered";
        return "unanswered";
    };

    // Quiz Setup Page
    if (!quizStarted) {
        return (
            <main className="min-h-screen bg-slate-50">
                <div className="bg-white border-b border-slate-200">
                    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4">
                            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-slate-100 transition">
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="font-semibold text-slate-900">MCQ Practice</h1>
                                <p className="text-sm text-slate-500">{formatName(subject)} • {formatName(topic)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-900">Quiz Configuration</h2>
                            <p className="text-sm text-slate-500 mt-1">Customize your {formatName(subject)} practice session</p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Number of Questions</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[5, 10, 15, 20].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setSelectedQuestionCount(Math.min(count, allQuestions.length))}
                                            disabled={count > allQuestions.length}
                                            className={`py-3 px-4 rounded-lg text-sm font-medium transition ${selectedQuestionCount === count
                                                ? 'bg-blue-600 text-white'
                                                : count > allQuestions.length
                                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                }`}
                                        >
                                            {count}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Available: {allQuestions.length} questions</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Time Limit</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[5, 10, 15, 20].map((mins) => (
                                        <button
                                            key={mins}
                                            onClick={() => setSelectedTimeLimit(mins)}
                                            className={`py-3 px-4 rounded-lg text-sm font-medium transition ${selectedTimeLimit === mins
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                }`}
                                        >
                                            {mins} min
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                <h4 className="text-sm font-medium text-blue-900 mb-2">Quiz Summary</h4>
                                <div className="flex justify-between text-sm">
                                    <span className="text-blue-700">Subject:</span>
                                    <span className="font-medium text-blue-900">{formatName(subject)}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="text-blue-700">Questions:</span>
                                    <span className="font-medium text-blue-900">{selectedQuestionCount}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="text-blue-700">Time:</span>
                                    <span className="font-medium text-blue-900">{selectedTimeLimit} minutes</span>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="text-blue-700">Per Question:</span>
                                    <span className="font-medium text-blue-900">{Math.round((selectedTimeLimit * 60) / selectedQuestionCount)}s</span>
                                </div>
                            </div>

                            <button
                                onClick={startQuiz}
                                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Start Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Results Page
    if (isSubmitted) {
        const accuracy = Math.round((score / questions.length) * 100);
        const timeTaken = (selectedTimeLimit * 60) - timeLeft;

        return (
            <main className="min-h-screen bg-slate-50">
                <div className="bg-white border-b border-slate-200">
                    <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
                        <h1 className="font-semibold text-slate-900">Quiz Results - {formatName(subject)}</h1>
                        <p className="text-sm text-slate-500">{formatName(topic)}</p>
                    </div>
                </div>

                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                    <div className="text-3xl font-bold text-blue-600">{score}/{questions.length}</div>
                                    <div className="text-sm text-blue-700">Correct</div>
                                </div>
                                <div className="text-center p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                                    <div className="text-3xl font-bold text-emerald-600">{accuracy}%</div>
                                    <div className="text-sm text-emerald-700">Accuracy</div>
                                </div>
                                <div className="text-center p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                    <div className="text-3xl font-bold text-slate-700">{formatTime(timeTaken)}</div>
                                    <div className="text-sm text-slate-600">Time</div>
                                </div>
                            </div>

                            <div className={`text-center p-4 rounded-xl mt-4 ${accuracy >= 80 ? 'bg-emerald-50 border border-emerald-100' : accuracy >= 60 ? 'bg-amber-50 border border-amber-100' : 'bg-rose-50 border border-rose-100'}`}>
                                <h3 className={`font-semibold ${accuracy >= 80 ? 'text-emerald-700' : accuracy >= 60 ? 'text-amber-700' : 'text-rose-700'}`}>
                                    {accuracy >= 80 ? 'Excellent!' : accuracy >= 60 ? 'Good Effort!' : 'Keep Practicing!'}
                                </h3>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-semibold text-slate-900 mb-4">Answer Review</h3>
                            <div className="space-y-3">
                                {questions.map((q, idx) => {
                                    const isCorrect = selectedAnswers[idx] === q.correctAnswer;
                                    const wasAnswered = selectedAnswers[idx] !== undefined;
                                    return (
                                        <div key={idx} className={`p-4 rounded-xl border ${isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                                            <div className="flex items-start gap-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                                    {isCorrect ? (
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-slate-900 text-sm mb-1">{idx + 1}. {q.question}</p>
                                                    {wasAnswered && (
                                                        <div className="text-sm">
                                                            {!isCorrect && (
                                                                <p className="text-rose-700">Your answer: {q.options[selectedAnswers[idx]]}</p>
                                                            )}
                                                            <p className="text-emerald-700">Correct: {q.options[q.correctAnswer]}</p>
                                                        </div>
                                                    )}
                                                    {q.explanation && (
                                                        <p className="text-xs text-slate-600 mt-2 italic">{q.explanation}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
                            <button onClick={handleRetry} className="flex-1 py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                                Try Again
                            </button>
                            <button onClick={handleBack} className="flex-1 py-2.5 px-4 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                                Back to Topics
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Quiz Interface
    const currentQ = questions[currentQuestion];
    const userAnswer = selectedAnswers[currentQuestion];
    const hasAnswered = userAnswer !== undefined;

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={handleBack} className="p-2 rounded-lg hover:bg-slate-100 transition">
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="font-semibold text-slate-900 text-sm">{formatName(subject)} MCQs</h1>
                                <p className="text-xs text-slate-500">{formatName(topic)}</p>
                            </div>
                        </div>

                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-medium ${timeLeft < 60 ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[1fr_240px] gap-6">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-slate-600">Question {currentQuestion + 1} of {questions.length}</span>
                                <button
                                    onClick={toggleMarkForReview}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${markedForReview.includes(currentQuestion) ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    <svg className="w-3.5 h-3.5" fill={markedForReview.includes(currentQuestion) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                    {markedForReview.includes(currentQuestion) ? 'Marked' : 'Mark'}
                                </button>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-lg font-medium text-slate-900 mb-6 leading-relaxed">{currentQ.question}</h2>

                            <div className="space-y-2 mb-6">
                                {currentQ.options.map((option, idx) => {
                                    const isSelected = userAnswer === idx;
                                    const isCorrect = idx === currentQ.correctAnswer;
                                    let optionClass = "w-full text-left p-4 rounded-xl border-2 text-sm transition-all";

                                    if (!hasAnswered) {
                                        optionClass += " border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
                                    } else {
                                        if (isCorrect) {
                                            optionClass += " border-emerald-400 bg-emerald-50";
                                        } else if (isSelected) {
                                            optionClass += " border-rose-400 bg-rose-50";
                                        } else {
                                            optionClass += " border-slate-100 bg-slate-50 opacity-60";
                                        }
                                    }

                                    return (
                                        <button key={idx} onClick={() => !hasAnswered && handleAnswerSelect(idx)} className={optionClass} disabled={hasAnswered}>
                                            <div className="flex items-center gap-3">
                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${isSelected ? (isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white')
                                                    : isCorrect && hasAnswered ? 'bg-emerald-500 text-white'
                                                        : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                <span className="text-slate-700">{option}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {hasAnswered && showExplanation && currentQ.explanation && (
                                <div className={`p-4 rounded-xl border ${userAnswer === currentQ.correctAnswer ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                                    <div className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm text-slate-700">{currentQ.explanation}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                            <button
                                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                disabled={currentQuestion === 0}
                                className="flex items-center gap-1.5 px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>

                            <button onClick={handleSubmit} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition">
                                Submit Quiz
                            </button>

                            <button
                                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                                disabled={currentQuestion === questions.length - 1}
                                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                Next
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-20">
                            <h3 className="font-semibold text-slate-900 text-sm mb-4">Questions</h3>

                            <div className="grid grid-cols-5 gap-2 mb-5">
                                {questions.map((_, idx) => {
                                    const status = getQuestionStatus(idx);
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentQuestion(idx)}
                                            className={`w-9 h-9 rounded-lg font-medium text-sm transition-all ${idx === currentQuestion ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                                                } ${status === 'answered'
                                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                    : status === 'review'
                                                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {idx + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="border-t border-slate-200 pt-4 space-y-2">
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-4 h-4 rounded bg-emerald-500" />
                                    <span className="text-slate-600">Answered ({Object.keys(selectedAnswers).length})</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-4 h-4 rounded bg-amber-500" />
                                    <span className="text-slate-600">Marked ({markedForReview.length})</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200" />
                                    <span className="text-slate-600">Not Answered ({questions.length - Object.keys(selectedAnswers).length})</span>
                                </div>
                            </div>

                            <button onClick={handleSubmit} className="w-full mt-5 py-2.5 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                                Submit Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MCQPractice;
