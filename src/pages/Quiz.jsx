import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { quizzes } from "../data/quizData";
import { useAuth } from "../context/AuthContext";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Badge from "../Components/ui/Badge";
import Alert from "../Components/ui/Alert";
import Icon from "../Components/ui/Icon";
import { Skeleton } from "../Components/ui/Skeleton";

const Quiz = () => {
  // Core game state
  const [screen, setScreen] = useState("selection"); // 'selection' | 'active' | 'results'
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Timer (15s per question)
  const [timeLeft, setTimeLeft] = useState(15);

  // Firebase / user state
  const { currentUser } = useAuth();
  const [highScores, setHighScores] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);

  // Save score to Firestore
  const saveScore = async (finalScore) => {
    setIsSaving(true);
    try {
      const attempt = {
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        score: finalScore,
        totalQuestions: activeQuiz.questions.length,
        completedAt: new Date(),
      };
      await addDoc(collection(db, "Users", currentUser.uid, "quizAttempts"), attempt);
      setHighScores((prev) => ({
        ...prev,
        [activeQuiz.id]: Math.max(prev[activeQuiz.id] || 0, finalScore),
      }));
      toast.success("Progress saved successfully!");
    } catch (err) {
      console.error("Error saving score:", err);
      toast.error("Failed to save progress.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle option selection
  const handleAnswerSelect = useCallback(
    (option, isTimeout = false) => {
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
    },
    [isAnswerSubmitted, activeQuiz, currentQuestionIdx]
  );

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScreen("active");
  };

  const handleNext = () => {
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < activeQuiz.questions.length) {
      setCurrentQuestionIdx(nextIdx);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setScreen("results");
      if (currentUser) {
        saveScore(score);
      }
    }
  };

  const getGradingFeedback = () => {
    const pct = (score / activeQuiz.questions.length) * 100;
    if (pct === 100) return { title: "Mastery achieved", msg: "Flawless score — you're a subject expert." };
    if (pct >= 80) return { title: "Outstanding work", msg: "Excellent job, you have a solid understanding!" };
    if (pct >= 60) return { title: "Good effort", msg: "Nice try — a little more practice to master it." };
    return { title: "Keep learning", msg: "A great chance to review the topics and try again." };
  };

  // Listen for auth state & fetch high scores
  useEffect(() => {
    if (currentUser) {
      setLoadingScores(true);
      const fetchScores = async () => {
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
      };
      fetchScores();
    } else {
      setHighScores({});
    }
  }, [currentUser]);

  // Timer countdown
  useEffect(() => {
    if (screen !== "active" || isAnswerSubmitted || !activeQuiz) return;

    setTimeLeft(15);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswerSelect(null, true); // timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, currentQuestionIdx, isAnswerSubmitted, activeQuiz, handleAnswerSelect]);

  const urgent = timeLeft <= 5;

  return (
    <div className="container-page flex min-h-[80vh] flex-col items-center justify-center py-14 text-ink-hi">
      {/* SCREEN 1 — Selection */}
      {screen === "selection" && (
        <div className="w-full max-w-5xl animate-fade-in">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Quiz Center</h1>
            <p className="mt-2 text-ink-low">Test your knowledge and verify your skills in real time.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} hoverable className="flex flex-col p-6">
                <Badge variant="sky" className="self-start">{quiz.subject}</Badge>
                <h3 className="mt-4 text-lg font-bold text-ink-hi">{quiz.title}</h3>
                <p className="mt-1.5 flex-grow text-sm leading-relaxed text-ink-low">{quiz.description}</p>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <div className="text-xs">
                    {loadingScores ? (
                      <Skeleton className="h-4 w-24" />
                    ) : highScores[quiz.id] !== undefined ? (
                      <span className="flex items-center gap-1.5 font-semibold text-sky">
                        <Icon name="trophy" size={14} /> Best: {highScores[quiz.id]} / {quiz.questions.length}
                      </span>
                    ) : (
                      <span className="text-ink-low">Not attempted yet</span>
                    )}
                  </div>
                  <Button size="sm" onClick={() => startQuiz(quiz)}>Start</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SCREEN 2 — Active */}
      {screen === "active" && activeQuiz && (
        <Card key={currentQuestionIdx} className="w-full max-w-2xl animate-fade-in p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-sky">{activeQuiz.title}</p>
              <h2 className="mt-1 text-base font-bold text-ink">
                Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
              </h2>
            </div>
            <span
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold tabular-nums ${
                urgent
                  ? "animate-pulse border-state-danger/40 bg-state-danger/15 text-state-danger"
                  : "border-sky/30 bg-sky/10 text-sky"
              }`}
            >
              <Icon name="clock" size={14} /> 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
          </div>

          {/* Timer bar */}
          <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${
                urgent ? "bg-state-danger" : "bg-gradient-to-r from-violet-500 to-sky"
              }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>

          <h3 className="mb-7 text-xl font-bold leading-snug text-ink-hi md:text-2xl">
            {activeQuiz.questions[currentQuestionIdx].questionText}
          </h3>

          <div className="grid gap-3">
            {activeQuiz.questions[currentQuestionIdx].options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === activeQuiz.questions[currentQuestionIdx].correctAnswer;

              let style = "border-white/[0.08] bg-white/[0.03] hover:border-violet-500 hover:bg-white/[0.06]";
              if (isAnswerSubmitted) {
                if (isCorrectAnswer) style = "border-state-success bg-state-success/15 text-emerald-200";
                else if (isSelected) style = "border-state-danger bg-state-danger/15 text-rose-200";
                else style = "border-white/[0.05] opacity-60";
              } else if (isSelected) {
                style = "border-violet-500 bg-white/[0.08]";
              }

              return (
                <button
                  key={option}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleAnswerSelect(option)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 md:text-base ${style}`}
                >
                  <span>{option}</span>
                  {isAnswerSubmitted && isCorrectAnswer && (
                    <span className="text-xs font-bold uppercase text-state-success">✓ Correct</span>
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <span className="text-xs font-bold uppercase text-state-danger">✗ Wrong</span>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div className="mt-8 flex justify-end">
              <Button onClick={handleNext}>
                {currentQuestionIdx + 1 === activeQuiz.questions.length ? "Finish quiz" : "Next question"}
                <Icon name="arrow" size={16} />
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* SCREEN 3 — Results */}
      {screen === "results" && activeQuiz && (
        <Card className="w-full max-w-lg animate-fade-up p-8 text-center">
          <h2 className="text-2xl font-bold text-ink-hi md:text-3xl">{getGradingFeedback().title}</h2>
          <p className="mt-1.5 text-sm text-ink-low">{getGradingFeedback().msg}</p>

          <div className="mx-auto my-7 grid h-36 w-36 place-items-center rounded-full border-4 border-violet-600 bg-white/[0.04]">
            <div>
              <span className="text-4xl font-extrabold text-ink-hi">{score}</span>
              <span className="text-xl text-ink-low"> / {activeQuiz.questions.length}</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-sky">
                {Math.round((score / activeQuiz.questions.length) * 100)}%
              </p>
            </div>
          </div>

          {!currentUser ? (
            <div className="mb-7 text-left">
              <Alert variant="warning" title="You're not signed in">
                Your high scores won&rsquo;t be saved to your student profile.
                <div className="mt-2 flex gap-4">
                  <Link to="/login" className="font-semibold text-sky underline">Log in</Link>
                  <Link to="/signUp" className="font-semibold text-sky underline">Sign up</Link>
                </div>
              </Alert>
            </div>
          ) : (
            <div className="mb-7">
              {isSaving ? (
                <p className="animate-pulse text-sm text-ink-low">Saving score to your profile…</p>
              ) : (
                <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-state-success">
                  <Icon name="check-circle" size={16} /> Score saved to your profile
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center gap-3">
            <Button variant="secondary" onClick={() => startQuiz(activeQuiz)}>Try again</Button>
            <Button onClick={() => setScreen("selection")}>Back to quizzes</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Quiz;
