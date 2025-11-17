import React, { useState, useEffect, useMemo } from 'react';

// --- Helper Components for Icons ---
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

const ChevronDownIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);

// --- Timer Component ---
const Timer = ({ initialMinutes, onTimeUp }) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);

    useEffect(() => {
        if (seconds <= 0) {
            onTimeUp();
            return;
        }
        const timerId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [seconds, onTimeUp]);

    const formatTime = () => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return <div className="text-sm font-mono text-slate-600">{formatTime()}</div>;
};

// --- Main Quiz Component ---
function QuizComponent({ quizData, timeLimitInMinutes, onBackToSetup }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(null));
    const [explanationVisibility, setExplanationVisibility] = useState(Array(quizData.length).fill(false));
    const [quizFinished, setQuizFinished] = useState(false);
    const [startTime] = useState(Date.now());
    
    const answeredQuestions = useMemo(() => new Set(), [quizData]);

    const handleAnswer = (optionIndex) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = optionIndex;
        setUserAnswers(newAnswers);
        answeredQuestions.add(currentQuestion);
        
        const newVisibility = [...explanationVisibility];
        newVisibility[currentQuestion] = true;
        setExplanationVisibility(newVisibility);
    };

    const toggleExplanation = (index) => {
        const newVisibility = [...explanationVisibility];
        newVisibility[index] = !newVisibility[index];
        setExplanationVisibility(newVisibility);
    };
    
    const handleSubmit = () => {
        setQuizFinished(true);
    };
    
    const calculateScore = () => {
        return userAnswers.reduce((score, answer, index) => {
            return answer === quizData[index].correctAnswer ? score + 1 : score;
        }, 0);
    };
    
    const restartQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers(Array(quizData.length).fill(null));
        setExplanationVisibility(Array(quizData.length).fill(false));
        setQuizFinished(false);
        answeredQuestions.clear();
    };

    if (quizFinished) {
        const score = calculateScore();
        const percentage = ((score / quizData.length) * 100).toFixed(0);
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        
        return (
            <div className="bg-white rounded-lg border border-slate-200 w-full max-w-5xl">
                <div className="border-b border-slate-200 px-8 py-6">
                    <h2 className="text-2xl font-semibold text-slate-900">Results</h2>
                </div>
                
                <div className="p-8">
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="text-4xl font-semibold text-slate-900 mb-1">{score}/{quizData.length}</div>
                            <div className="text-sm text-slate-500">Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-semibold text-slate-900 mb-1">{percentage}%</div>
                            <div className="text-sm text-slate-500">Accuracy</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-semibold text-slate-900 mb-1">{minutes}m {seconds}s</div>
                            <div className="text-sm text-slate-500">Time</div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        {quizData.map((q, index) => {
                            const isCorrect = userAnswers[index] === q.correctAnswer;
                            const wasAnswered = userAnswers[index] !== null;
                            return (
                                <div key={index} className="border border-slate-200 rounded p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5">
                                            {isCorrect ? <CheckCircleIcon /> : <XCircleIcon />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-slate-900 mb-1">
                                                {index + 1}. {q.question}
                                            </div>
                                            {wasAnswered && (
                                                <div className="text-sm text-slate-600">
                                                    {!isCorrect && (
                                                        <div className="mb-1">
                                                            Your answer: <span className="text-red-600">{q.options[userAnswers[index]]}</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        Correct answer: <span className="text-emerald-600">{q.options[q.correctAnswer]}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={restartQuiz} 
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                            Retry
                        </button>
                        <button 
                            onClick={onBackToSetup} 
                            className="px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded border border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                            New Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    const { question, options, correctAnswer, explanation } = quizData[currentQuestion];
    const userAnswer = userAnswers[currentQuestion];
    const hasAnsweredCurrent = userAnswer !== null;

    return (
        <div className="bg-white rounded-lg border border-slate-200 w-full max-w-7xl flex flex-col lg:flex-row">
            <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                        <span>Question {currentQuestion + 1} of {quizData.length}</span>
                        <Timer initialMinutes={timeLimitInMinutes} onTimeUp={handleSubmit} />
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1">
                        <div 
                            className="bg-blue-600 h-1 rounded-full transition-all duration-300" 
                            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <h2 className="text-xl font-medium text-slate-900 mb-6 leading-relaxed">{question}</h2>

                <div className="space-y-2 mb-6">
                    {options.map((option, index) => {
                        const isSelected = userAnswer === index;
                        const isCorrect = index === correctAnswer;
                        let optionClass = "w-full text-left p-4 rounded border transition-all text-sm";

                        if (!hasAnsweredCurrent) {
                            optionClass += " border-slate-200 hover:border-blue-600 hover:bg-blue-50 cursor-pointer";
                        } else {
                            if (isCorrect) {
                                optionClass += " border-emerald-200 bg-emerald-50 text-emerald-900";
                            } else if (isSelected) {
                                optionClass += " border-red-200 bg-red-50 text-red-900";
                            } else {
                                optionClass += " border-slate-200 text-slate-400";
                            }
                        }

                        return (
                            <button 
                                key={index} 
                                onClick={() => !hasAnsweredCurrent && handleAnswer(index)} 
                                className={optionClass}
                                disabled={hasAnsweredCurrent}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {hasAnsweredCurrent && (
                    <div className="border border-slate-200 rounded">
                        <button 
                            onClick={() => toggleExplanation(currentQuestion)} 
                            className="w-full flex justify-between items-center p-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <span>Explanation</span>
                            <ChevronDownIcon className={explanationVisibility[currentQuestion] ? 'rotate-180' : ''} />
                        </button>
                        {explanationVisibility[currentQuestion] && (
                            <div className="px-4 pb-4 border-t border-slate-200 pt-4">
                                <p className="text-sm text-slate-600 leading-relaxed">{explanation}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full lg:w-80 p-6 bg-slate-50">
                <div className="grid grid-cols-5 gap-2 mb-6">
                    {quizData.map((_, index) => {
                        let navClass = "w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition-colors cursor-pointer";
                        if (index === currentQuestion) {
                            navClass += " bg-blue-600 text-white";
                        } else if (userAnswers[index] !== null) {
                            navClass += " bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
                        } else {
                            navClass += " bg-white border border-slate-200 text-slate-600 hover:bg-slate-100";
                        }
                        return (
                            <button key={index} onClick={() => setCurrentQuestion(index)} className={navClass}>
                                {index + 1}
                            </button>
                        )
                    })}
                </div>

                <div className="space-y-2">
                    <button 
                        onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)} 
                        disabled={currentQuestion === 0}
                        className="w-full px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded border border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => currentQuestion < quizData.length - 1 && setCurrentQuestion(currentQuestion + 1)} 
                        disabled={currentQuestion === quizData.length - 1}
                        className="w-full px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded border border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                    >
                        Submit Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Parent App Component ---
export default function QuizApp() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState(5);
    const [timeLimit, setTimeLimit] = useState(10);

    const allQuizData = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Lisbon"],
            correctAnswer: 2,
            explanation: "Paris is the capital and most populous city of France, known for its art, fashion, and culture."
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correctAnswer: 1,
            explanation: "Mars is often called the 'Red Planet' because of the iron oxide on its surface, giving it a reddish appearance."
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correctAnswer: 3,
            explanation: "The Pacific Ocean is the largest and deepest of the world's oceans, covering more than 30% of the Earth's surface."
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correctAnswer: 1,
            explanation: "William Shakespeare, an English playwright, poet, and actor, is widely regarded as the greatest writer in the English language."
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["O2", "H2O", "CO2", "NaCl"],
            correctAnswer: 1,
            explanation: "H2O is the chemical formula for water, indicating that one molecule of water contains two hydrogen (H) atoms and one oxygen (O) atom."
        },
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correctAnswer: 2,
            explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September."
        },
        {
            question: "What is the smallest prime number?",
            options: ["0", "1", "2", "3"],
            correctAnswer: 2,
            explanation: "2 is the smallest prime number and the only even prime number."
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            correctAnswer: 2,
            explanation: "Plants absorb carbon dioxide (CO2) from the atmosphere during photosynthesis."
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2,
            explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century, and it is now displayed in the Louvre Museum in Paris."
        },
        {
            question: "What is the speed of light in vacuum?",
            options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
            correctAnswer: 0,
            explanation: "The speed of light in vacuum is approximately 300,000 kilometers per second (or 299,792,458 meters per second to be precise)."
        }
    ];

    const quizData = allQuizData.slice(0, selectedQuestions);

    const handleStartQuiz = () => {
        setQuizStarted(true);
    };

    const handleBackToSetup = () => {
        setQuizStarted(false);
    };

    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg border border-slate-200 w-full max-w-md">
                    <div className="border-b border-slate-200 px-6 py-4">
                        <h1 className="text-xl font-semibold text-slate-900">Quiz Configuration</h1>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Number of Questions
                            </label>
                            <select 
                                value={selectedQuestions} 
                                onChange={(e) => setSelectedQuestions(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            >
                                {[...Array(allQuizData.length)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Time Limit
                            </label>
                            <select 
                                value={timeLimit} 
                                onChange={(e) => setTimeLimit(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            >
                                <option value={5}>5 minutes</option>
                                <option value={10}>10 minutes</option>
                                <option value={15}>15 minutes</option>
                                <option value={20}>20 minutes</option>
                                <option value={30}>30 minutes</option>
                            </select>
                        </div>

                        <button 
                            onClick={handleStartQuiz}
                            className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <QuizComponent quizData={quizData} timeLimitInMinutes={timeLimit} onBackToSetup={handleBackToSetup} />
        </div>
    );
}