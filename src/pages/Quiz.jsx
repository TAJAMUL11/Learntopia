import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useBlocker } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, doc, increment, setDoc } from "firebase/firestore";
import { quizzes } from "../data/quizData";
import { getLocalizedQuiz } from "../utils/localizationUtils";
import { useAuth } from "../context/AuthContext";
import { useSound } from "../context/SoundContext";
import { useLanguage } from "../context/LanguageContext";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Badge from "../Components/ui/Badge";
import Alert from "../Components/ui/Alert";
import Icon from "../Components/ui/Icon";
import Modal from "../Components/ui/Modal";
import { Skeleton } from "../Components/ui/Skeleton";

const Quiz = () => {
  const { playClick, playCorrect, playIncorrect, playLevelUp, playTimerTick, playTimerUrgent } = useSound();
  const { t } = useLanguage();

  // Localize quiz metadata + questions/options for the active language.
  const localizedQuizzes = useMemo(() => quizzes.map((q) => getLocalizedQuiz(q, t)), [t]);

  // Core game state
  const [screen, setScreen] = useState("selection"); // 'selection' | 'active' | 'results'
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const [showQuitModal, setShowQuitModal] = useState(false);

  // Compute exact score dynamically from userAnswers map (no stale closure bug)
  const score = activeQuiz
    ? activeQuiz.questions.reduce((acc, q, idx) => {
        return userAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
      }, 0)
    : 0;

  // Block navigation when a quiz is active
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      screen === "active" && currentLocation.pathname !== nextLocation.pathname
  );

  // Timer (15s per question)
  const [timeLeft, setTimeLeft] = useState(15);

  // Firebase / user state
  const { currentUser } = useAuth();
  const [highScores, setHighScores] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);

  // Save score to Firestore with fail-safe merge
  const saveScore = async (finalScore) => {
    if (!currentUser || !activeQuiz) return;
    setIsSaving(true);
    try {
      const attempt = {
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        score: finalScore,
        totalQuestions: activeQuiz.questions.length,
        completedAt: new Date(),
      };

      await addDoc(
        collection(db, "Users", currentUser.uid, "quizAttempts"),
        attempt
      );

      const pointsEarned = finalScore * 10;
      if (pointsEarned > 0) {
        const userRef = doc(db, "Users", currentUser.uid);
        await setDoc(userRef, {
          totalPoints: increment(pointsEarned)
        }, { merge: true });

        // Sync to global QuizLeaderboard
        const globalScoreRef = doc(db, "QuizLeaderboards", activeQuiz.id, "Scores", currentUser.uid);
        await setDoc(globalScoreRef, {
          score: pointsEarned,
          rawScore: finalScore,
          userFullName: currentUser.displayName || "User",
          userId: currentUser.uid,
          completedAt: new Date()
        }, { merge: true });

        // Sync to PublicLeaderboard
        const publicRef = doc(db, "PublicLeaderboard", currentUser.uid);
        await setDoc(publicRef, {
          uid: currentUser.uid,
          fullName: currentUser.displayName || "Learner",
          totalPoints: increment(pointsEarned),
          updatedAt: new Date()
        }, { merge: true });
      }

      setHighScores((prev) => ({
        ...prev,
        [activeQuiz.id]: Math.max(prev[activeQuiz.id] || 0, finalScore),
      }));
      toast.success(t("toasts.quizProgressSaved"));
    } catch (err) {
      console.error("Error saving score:", err);
      toast.error(t("toasts.quizProgressFailed"));
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
      setUserAnswers((prev) => ({ ...prev, [currentQuestionIdx]: option }));

      if (isCorrect) {
        playCorrect();
      } else {
        playIncorrect();
      }

      if (isTimeout) {
        toast.error(t("toasts.timesUp"), {
          style: { backgroundColor: "rgba(225, 29, 72, 0.15)", color: "#fecdd3", border: "1px solid rgba(225, 29, 72, 0.3)" }
        });
      }
    },
    [isAnswerSubmitted, activeQuiz, currentQuestionIdx, playCorrect, playIncorrect]
  );

  const startQuiz = (quiz) => {
    playClick();
    const QUESTIONS_PER_QUIZ = 10;
    const shuffledQuestions = [...quiz.questions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, QUESTIONS_PER_QUIZ);
    
    const sessionQuiz = {
      ...quiz,
      questions: selectedQuestions
    };

    setActiveQuiz(sessionQuiz);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScreen("active");
  };

  const handleNext = () => {
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < activeQuiz.questions.length) {
      playClick();
      setCurrentQuestionIdx(nextIdx);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      playLevelUp();
      const finalScore = activeQuiz.questions.reduce((acc, q, idx) => {
        return userAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
      }, 0);
      setScreen("results");
      if (currentUser) {
        saveScore(finalScore);
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

        const nextVal = prev - 1;
        if (nextVal <= 5) {
          if (nextVal <= 3) {
            playTimerUrgent();
          } else {
            playTimerTick();
          }
        }
        return nextVal;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, currentQuestionIdx, isAnswerSubmitted, activeQuiz, handleAnswerSelect, playTimerTick, playTimerUrgent]);

  const urgent = timeLeft <= 5;

  return (
    <div className="container-page flex min-h-[80vh] flex-col items-center justify-center py-14 text-ink-hi">
      {/* SCREEN 1 — Selection */}
      {screen === "selection" && (
        <div className="w-full max-w-5xl animate-fade-in">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("quiz.title")}</h1>
            <p className="mt-2 text-ink-low">{t("quiz.subtitle")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localizedQuizzes.map((quiz) => {
              const attempted = !loadingScores && highScores[quiz.id] !== undefined;
              return (
                <Card
                  key={quiz.id}
                  hoverable
                  className={`relative flex flex-col p-6 transition-all ${attempted ? "border-emerald-500/20 bg-emerald-500/[0.03]" : ""}`}
                >
                  {/* Attempted badge — top-right corner */}
                  {attempted && (
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      <Icon name="check-circle" size={10} /> Done
                    </div>
                  )}

                  <Badge variant="sky" className="self-start">{quiz.subject}</Badge>
                  <h3 className="mt-4 text-lg font-bold text-ink-hi">{quiz.title}</h3>
                  <p className="mt-1.5 flex-grow text-sm leading-relaxed text-ink-low">{quiz.description}</p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <div className="text-xs">
                      {loadingScores ? (
                        <Skeleton className="h-4 w-24" />
                      ) : attempted ? (
                        <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                          <Icon name="trophy" size={14} /> Best: {highScores[quiz.id]} / {Math.min(quiz.questions.length, 10)}
                        </span>
                      ) : (
                        <span className="text-ink-low">Not attempted yet</span>
                      )}
                    </div>
                    {attempted ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => startQuiz(quiz)}
                        className="flex items-center gap-1.5 !border-emerald-500/30 !text-emerald-400 hover:!bg-emerald-500/10"
                      >
                        <Icon name="refresh-cw" size={12} /> Retake
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => startQuiz(quiz)}>{t("quiz.start")}</Button>
                    )}
                  </div>
                </Card>
              );
            })}
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
                    <span className="text-xs font-bold uppercase text-state-success">✓ {t("exerciseEngine.correctTitle")}</span>
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                    <span className="text-xs font-bold uppercase text-state-danger">✗ {t("exerciseEngine.incorrectTitle")}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button variant="danger" onClick={() => setShowQuitModal(true)}>
              {t("quiz.quitBtn")}
            </Button>
            {isAnswerSubmitted ? (
              <Button onClick={handleNext}>
                {currentQuestionIdx + 1 === activeQuiz.questions.length ? t("quiz.submitQuiz") : t("quiz.nextQuestion")}
                <Icon name="arrow" size={16} />
              </Button>
            ) : (
              <div />
            )}
          </div>
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
              <Alert variant="warning" title={t("quiz.notSignedInTitle")}>
                {t("quiz.notSignedInMsg")}
                <div className="mt-2 flex gap-4">
                  <Link
                    to="/login"
                    state={{
                      returnTo: "/quiz",
                      pendingQuizResult: {
                        quizId: activeQuiz.id,
                        quizTitle: activeQuiz.title,
                        score: score,
                        totalQuestions: activeQuiz.questions.length,
                      }
                    }}
                    className="font-semibold text-sky underline"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/signUp"
                    state={{
                      returnTo: "/quiz",
                      pendingQuizResult: {
                        quizId: activeQuiz.id,
                        quizTitle: activeQuiz.title,
                        score: score,
                        totalQuestions: activeQuiz.questions.length,
                      }
                    }}
                    className="font-semibold text-sky underline"
                  >
                    {t("nav.signUp")}
                  </Link>
                </div>
              </Alert>
            </div>
          ) : (
            <div className="mb-7">
              {isSaving ? (
                <p className="animate-pulse text-sm text-ink-low">Saving score to your profile…</p>
              ) : (
                <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-state-success">
                  <Icon name="check-circle" size={16} /> {t("quiz.resultsTitle")}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center gap-3">
            <Button variant="secondary" onClick={() => startQuiz(activeQuiz)}>{t("quiz.tryAgain")}</Button>
            <Button onClick={() => setScreen("selection")}>{t("quiz.backToQuizzes")}</Button>
          </div>
        </Card>
      )}

      {/* Modals */}
      <Modal
        isOpen={showQuitModal || blocker?.state === "blocked"}
        onClose={() => {
          if (blocker?.state === "blocked") blocker.reset();
          setShowQuitModal(false);
        }}
        title={t("quiz.quitTitle")}
        icon="alert-triangle"
        actionText={t("quiz.quitConfirm")}
        actionVariant="danger"
        isDestructive={true}
        onAction={() => {
          if (blocker?.state === "blocked") {
            blocker.proceed();
          } else {
            setScreen("selection");
            setActiveQuiz(null);
          }
          setShowQuitModal(false);
        }}
      >
        <p>{t("quiz.quitMsg")}</p>
      </Modal>

    </div>
  );
};

export default Quiz;
