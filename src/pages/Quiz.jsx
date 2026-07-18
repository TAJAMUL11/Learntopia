import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import gsap from "gsap";
import { auth, db } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { quizzes } from "../data/quizData";

const Quiz = () => {

  // Core Game States
  const [screen, setScreen] = useState("selection"); // 'selection' | 'active' | 'results'
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Timer States (15s per question)
  const [timeLeft, setTimeLeft] = useState(15);

  // Firebase/User States
  const [user, setUser] = useState(null);
  const [highScores, setHighScores] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);

  // GSAP Refs
  const selectionRef = useRef(null);
  const questionContainerRef = useRef(null);
  const resultsCardRef = useRef(null);

  // Save Score to Firestore
  const saveScore = async (finalScore) => {
    setIsSaving(true);
    try {
      const attempt = {
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        score: finalScore,
        totalQuestions: activeQuiz.questions.length,
        completedAt: new Date()
      };
      await addDoc(collection(db, "Users", user.uid, "quizAttempts"), attempt);
      setHighScores((prev) => ({
        ...prev,
        [activeQuiz.id]: Math.max(prev[activeQuiz.id] || 0, finalScore)
      }));
      toast.success("Progress saved successfully!");
    } catch (err) {
      console.error("Error saving score:", err);
      toast.error("Failed to save progress.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Option Selection
  const handleAnswerSelect = useCallback((option, isTimeout = false) => {
    if (isAnswerSubmitted) return;

    const currentQuestion = activeQuiz.questions[currentQuestionIdx];
    const isCorrect = option === currentQuestion.correctAnswer;

    setSelectedAnswer(option);
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (isTimeout) {
      toast.warn("Time's up for this question!");
    }
  }, [isAnswerSubmitted, activeQuiz, currentQuestionIdx]);

  // Handle Quiz Start
  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScreen("active");
  };

  // Handle Progression
  const handleNext = () => {
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < activeQuiz.questions.length) {
      setCurrentQuestionIdx(nextIdx);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setScreen("results");
      if (user) {
        saveScore(score);
      }
    }
  };

  // Score Grading Comments
  const getGradingFeedback = () => {
    const pct = (score / activeQuiz.questions.length) * 100;
    if (pct === 100) return { title: "Mastery Achieved! 🏆", msg: "Flawless score! You are a subject expert." };
    if (pct >= 80) return { title: "Outstanding! 🌟", msg: "Excellent job, you have a solid understanding!" };
    if (pct >= 60) return { title: "Good Effort! 👍", msg: "Nice try! Just a little more practice to master it." };
    return { title: "Keep Learning! 📚", msg: "A great opportunity to review the topics and try again." };
  };

  // 1. Listen for Auth State & Fetch High Scores
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoadingScores(true);
        try {
          const q = collection(db, "Users", currentUser.uid, "quizAttempts");
          const snapshot = await getDocs(q);
          const scores = {};
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.quizId) {
              scores[data.quizId] = Math.max(scores[data.quizId] || 0, data.score);
            }
          });
          setHighScores(scores);
        } catch (err) {
          console.error("Error fetching high scores:", err);
        } finally {
          setLoadingScores(false);
        }
      } else {
        setHighScores({});
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Entrance Animation for Selection Screen
  useEffect(() => {
    if (screen === "selection" && selectionRef.current) {
      gsap.fromTo(
        selectionRef.current.querySelectorAll(".quiz-card"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, [screen]);

  // 3. Slide Transition Animation for Questions
  useEffect(() => {
    if (screen === "active" && questionContainerRef.current) {
      gsap.fromTo(
        questionContainerRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [currentQuestionIdx, screen]);

  // 4. Results Screen Entry Animation
  useEffect(() => {
    if (screen === "results" && resultsCardRef.current) {
      gsap.fromTo(
        resultsCardRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
      );
    }
  }, [screen]);

  // 5. Timer Countdown Effect
  useEffect(() => {
    if (screen !== "active" || isAnswerSubmitted || !activeQuiz) return;

    setTimeLeft(15);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswerSelect(null, true); // Timeout trigger
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, currentQuestionIdx, isAnswerSubmitted, activeQuiz, handleAnswerSelect]);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-8 flex flex-col items-center justify-center min-h-[80vh] select-none text-white">
      
      {/* SCREEN 1: Selection Grid */}
      {screen === "selection" && (
        <div ref={selectionRef} className="w-full max-w-5xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wide">Quiz Center</h1>
            <p className="text-sm md:text-base text-gray-300 mt-2">
              Test your knowledge and verify your skillset in real time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="quiz-card background-blur flex flex-col justify-between p-6 rounded-2xl border border-light-bg-color transition-all hover:scale-[1.02] hover:bg-gradient-to-br from-primary-bg-color to-light-bg-color"
              >
                <div>
                  <span className="inline-block bg-highlighted-btn-bg text-black font-semibold text-xs px-3 py-1 rounded-full mb-4">
                    {quiz.subject}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                  <p className="text-xs text-gray-300 mb-6">{quiz.description}</p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-600/40">
                  <div className="text-xs">
                    {loadingScores ? (
                      <span className="text-gray-400">Loading record...</span>
                    ) : highScores[quiz.id] !== undefined ? (
                      <span className="text-highlighted-btn-bg font-semibold">
                        High Score: {highScores[quiz.id]} / 5
                      </span>
                    ) : (
                      <span className="text-gray-400">Not attempted yet</span>
                    )}
                  </div>
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="bg-button-bg-color text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:scale-95"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCREEN 2: Active Session */}
      {screen === "active" && activeQuiz && (
        <div className="w-full max-w-2xl background-blur p-6 md:p-8 rounded-3xl border border-light-bg-color shadow-custom-shadow">
          
          {/* Header Progress and Timer */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs text-highlighted-btn-bg uppercase font-bold tracking-wider">
                {activeQuiz.title}
              </p>
              <h2 className="text-lg font-bold text-gray-200">
                Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
              </h2>
            </div>
            
            {/* Timer visual count */}
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold px-3 py-1 rounded-full border ${
                timeLeft <= 5 ? "bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse" : "bg-light-bg-color border-button-bg-color text-button-bg-color"
              }`}>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>
          </div>

          {/* Horizontal progress bar representing timer */}
          <div className="w-full h-1 bg-gray-700/60 rounded-full mb-8 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                timeLeft <= 5 ? "bg-rose-500" : "bg-button-bg-color"
              }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div ref={questionContainerRef} className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold leading-snug">
              {activeQuiz.questions[currentQuestionIdx].questionText}
            </h3>
          </div>

          {/* Options List */}
          <div className="grid gap-4">
            {activeQuiz.questions[currentQuestionIdx].options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === activeQuiz.questions[currentQuestionIdx].correctAnswer;
              
              let cardStyle = "border-white/10 bg-white/5 hover:border-button-bg-color hover:bg-white/10";
              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  cardStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200";
                } else if (isSelected) {
                  cardStyle = "bg-rose-500/20 border-rose-500 text-rose-200";
                } else {
                  cardStyle = "opacity-60 border-white/5";
                }
              } else if (isSelected) {
                cardStyle = "border-highlighted-btn-bg bg-white/15";
              }

              return (
                <button
                  key={option}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-4 rounded-xl border text-sm md:text-base font-medium transition-all duration-300 flex justify-between items-center ${cardStyle}`}
                >
                  <span>{option}</span>
                  {isAnswerSubmitted && isCorrectAnswer && (
                    <span className="text-emerald-400 font-bold text-xs uppercase">✓ Correct</span>
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <span className="text-rose-400 font-bold text-xs uppercase">✗ Wrong</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="mt-8 flex justify-end">
            {isAnswerSubmitted && (
              <button
                onClick={handleNext}
                className="bg-highlighted-btn-bg text-black font-semibold px-6 py-3 rounded-xl transition-all hover:scale-95"
              >
                {currentQuestionIdx + 1 === activeQuiz.questions.length ? "Finish Quiz" : "Next Question"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* SCREEN 3: Results Score summary card */}
      {screen === "results" && activeQuiz && (
        <div ref={resultsCardRef} className="w-full max-w-lg background-blur p-8 rounded-3xl border border-light-bg-color shadow-custom-shadow text-center">
          
          <h2 className="text-3xl font-bold mb-1">{getGradingFeedback().title}</h2>
          <p className="text-sm text-gray-300 mb-6">{getGradingFeedback().msg}</p>

          {/* Score Circle Display */}
          <div className="inline-flex items-center justify-center w-36 h-36 rounded-full border-4 border-button-bg-color bg-light-bg-color/30 mb-6">
            <div className="text-center">
              <span className="text-4xl font-extrabold">{score}</span>
              <span className="text-xl text-gray-300"> / {activeQuiz.questions.length}</span>
              <p className="text-xs uppercase font-bold text-highlighted-btn-bg tracking-widest mt-1">
                {Math.round((score / activeQuiz.questions.length) * 100)}%
              </p>
            </div>
          </div>

          {/* User auth verification/alert */}
          {!user ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs p-4 rounded-xl mb-8 leading-relaxed">
              ⚠️ You are not signed in. Your high scores will not be saved to your student profile. 
              <div className="mt-2 flex gap-4 justify-center">
                <Link to="/login" className="underline text-highlighted-btn-bg font-semibold">Log In</Link>
                <Link to="/signUp" className="underline text-highlighted-btn-bg font-semibold">Sign Up</Link>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-300 mb-8">
              {isSaving ? (
                <span className="animate-pulse">Saving score to your profile...</span>
              ) : (
                <span className="text-emerald-400 font-semibold">✓ Score saved to your profile</span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => startQuiz(activeQuiz)}
              className="border border-button-bg-color text-white px-5 py-3 rounded-xl transition-all hover:bg-button-bg-color/20 text-sm font-semibold"
            >
              Try Again
            </button>
            <button
              onClick={() => setScreen("selection")}
              className="bg-button-bg-color text-white px-5 py-3 rounded-xl transition-all hover:scale-95 text-sm font-semibold"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Quiz;