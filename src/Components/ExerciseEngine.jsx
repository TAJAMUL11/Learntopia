import { useState } from "react";
import Icon from "./ui/Icon";
import Button from "./ui/Button";

/**
 * ExerciseEngine — Renders different exercise types with validation & feedback.
 * 
 * Props:
 *  - exercises: Array of exercise objects (with type field)
 *  - onAllCorrect: Callback when all exercises are answered correctly
 *  - isCompleted: Whether this module is already completed (review mode)
 *  - saving: Whether we're currently saving progress
 */
const ExerciseEngine = ({ exercises = [], onAllCorrect, isCompleted = false, saving = false }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState({});
  const [matchState, setMatchState] = useState({}); // Track match exercise state
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const totalQ = exercises.length;

  const handleSelectMCQ = (qIndex, option) => {
    if (submitted || saving || isCompleted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
    setShowFeedback(prev => ({ ...prev, [qIndex]: false }));
  };

  const handleTrueFalse = (qIndex, value) => {
    if (submitted || saving || isCompleted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: value }));
    setShowFeedback(prev => ({ ...prev, [qIndex]: false }));
  };

  const handleFillBlank = (qIndex, text) => {
    if (submitted || saving || isCompleted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: text }));
    setShowFeedback(prev => ({ ...prev, [qIndex]: false }));
  };

  const handleMatchSelect = (qIndex, side, value) => {
    if (submitted || saving || isCompleted) return;

    setMatchState(prev => {
      const state = prev[qIndex] || { left: null, right: null, matched: [] };
      const newState = { ...state };

      if (side === "left") {
        // Check if this left item is already matched
        if (state.matched.some(m => m.left === value)) return prev;
        newState.left = value;
      } else {
        // Check if this right item is already matched
        if (state.matched.some(m => m.right === value)) return prev;
        newState.right = value;
      }

      // If both sides selected, create a match
      if (newState.left !== null && newState.right !== null) {
        newState.matched = [...state.matched, { left: newState.left, right: newState.right }];
        newState.left = null;
        newState.right = null;

        // Update answers when all pairs matched
        const exercise = exercises[qIndex];
        if (newState.matched.length === exercise.pairs.length) {
          setAnswers(prev => ({ ...prev, [qIndex]: newState.matched }));
        }
      }

      return { ...prev, [qIndex]: newState };
    });

    setShowFeedback(prev => ({ ...prev, [qIndex]: false }));
  };

  const resetMatch = (qIndex) => {
    setMatchState(prev => ({ ...prev, [qIndex]: { left: null, right: null, matched: [] } }));
    setAnswers(prev => {
      const next = { ...prev };
      delete next[qIndex];
      return next;
    });
  };

  const checkIsCorrect = (qIndex) => {
    const exercise = exercises[qIndex];
    const ans = answers[qIndex];

    if (ans === undefined || ans === null || ans === "") return false;

    switch (exercise.type) {
      case "true-false":
        return ans === exercise.answer;
      case "fill-blank":
        return ans.trim().toLowerCase() === exercise.answer.trim().toLowerCase();
      case "match": {
        if (!Array.isArray(ans)) return false;
        return exercise.pairs.every(pair =>
          ans.some(m => m.left === pair.term && m.right === pair.definition)
        );
      }
      case "mcq":
      default:
        return ans === exercise.answer;
    }
  };

  const handleSubmitAll = () => {
    setSubmitted(true);

    const feedback = {};
    let allCorrect = true;
    exercises.forEach((_, i) => {
      const correct = checkIsCorrect(i);
      feedback[i] = true;
      if (!correct) allCorrect = false;
    });
    setShowFeedback(feedback);

    if (allCorrect) {
      onAllCorrect?.();
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setShowFeedback({});
    setAnswers({});
    setMatchState({});
    setCurrentQuestion(0);
  };

  const allAnswered = exercises.every((_, i) => {
    const ans = answers[i];
    if (ans === undefined || ans === null || ans === "") return false;
    const ex = exercises[i];
    if (ex.type === "match") return Array.isArray(ans) && ans.length === ex.pairs.length;
    return true;
  });

  const allCorrect = submitted && exercises.every((_, i) => checkIsCorrect(i));
  const correctCount = exercises.filter((_, i) => checkIsCorrect(i)).length;

  // Render individual exercise based on type
  const renderExercise = (exercise, qIndex) => {
    const userAns = answers[qIndex];
    const hasFeedback = showFeedback[qIndex];
    const isCorrect = hasFeedback ? checkIsCorrect(qIndex) : null;
    const isDone = isCompleted;

    switch (exercise.type) {
      case "true-false":
        return renderTrueFalse(exercise, qIndex, userAns, hasFeedback, isCorrect, isDone);
      case "fill-blank":
        return renderFillBlank(exercise, qIndex, userAns, hasFeedback, isCorrect, isDone);
      case "match":
        return renderMatch(exercise, qIndex, hasFeedback, isCorrect, isDone);
      case "mcq":
      default:
        return renderMCQ(exercise, qIndex, userAns, hasFeedback, isCorrect, isDone);
    }
  };

  const renderMCQ = (exercise, qIndex, userAns, hasFeedback, isCorrect, isDone) => {
    const displayAns = isDone ? exercise.answer : userAns;

    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {exercise.options.map((option) => {
          const isOptionCorrect = option === exercise.answer;
          const isSelected = displayAns === option;

          let style = "border-white/[0.08] bg-white/[0.02] hover:border-violet-500/50 hover:bg-white/[0.05]";

          if (isDone) {
            if (isOptionCorrect) style = "border-state-success bg-state-success/15 text-emerald-200 shadow-[0_0_10px_rgba(34,197,94,0.1)]";
            else style = "border-white/[0.03] opacity-40";
          } else if (hasFeedback) {
            if (isSelected && isOptionCorrect) style = "border-state-success bg-state-success/20 text-emerald-200 shadow-[0_0_10px_rgba(34,197,94,0.2)]";
            else if (isSelected && !isOptionCorrect) style = "border-state-danger bg-state-danger/20 text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.2)]";
            else if (isOptionCorrect) style = "border-state-success/50 bg-state-success/10 text-emerald-200";
            else style = "border-white/[0.03] opacity-40";
          } else if (isSelected) {
            style = "border-violet-500 bg-violet-500/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]";
          }

          return (
            <button
              key={option}
              type="button"
              disabled={isDone || submitted}
              onClick={() => handleSelectMCQ(qIndex, option)}
              className={`flex min-h-[56px] items-center justify-between rounded-xl border px-5 py-3 text-left text-sm font-medium transition-all duration-300 ${style}`}
            >
              <span>{option}</span>
              {((isDone && isOptionCorrect) || (hasFeedback && isSelected && isOptionCorrect)) && (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-state-success/20 text-state-success">
                  <Icon name="check" size={14} />
                </span>
              )}
              {hasFeedback && isSelected && !isOptionCorrect && (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-state-danger/20 text-state-danger">
                  <Icon name="x" size={14} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const renderTrueFalse = (exercise, qIndex, userAns, hasFeedback, isCorrect, isDone) => {
    const displayAns = isDone ? exercise.answer : userAns;

    const getBtnStyle = (val) => {
      const isThisCorrect = val === exercise.answer;
      const isSelected = displayAns === val;

      if (isDone) {
        return isThisCorrect
          ? "border-state-success bg-state-success/15 text-emerald-200 shadow-[0_0_10px_rgba(34,197,94,0.15)] scale-[1.02]"
          : "border-white/[0.03] opacity-40";
      }
      if (hasFeedback) {
        if (isSelected && isThisCorrect) return "border-state-success bg-state-success/20 text-emerald-200 shadow-[0_0_10px_rgba(34,197,94,0.2)] scale-[1.02]";
        if (isSelected && !isThisCorrect) return "border-state-danger bg-state-danger/20 text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.2)]";
        if (isThisCorrect) return "border-state-success/50 bg-state-success/10 text-emerald-200";
        return "border-white/[0.03] opacity-40";
      }
      if (isSelected) return "border-violet-500 bg-violet-500/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-[1.02]";
      return "border-white/[0.08] bg-white/[0.02] hover:border-violet-500/50 hover:bg-white/[0.05]";
    };

    return (
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          disabled={isDone || submitted}
          onClick={() => handleTrueFalse(qIndex, true)}
          className={`flex items-center justify-center gap-3 rounded-2xl border-2 px-6 py-5 text-lg font-bold transition-all duration-300 ${getBtnStyle(true)}`}
        >
          <span className="text-2xl">✅</span> True
        </button>
        <button
          type="button"
          disabled={isDone || submitted}
          onClick={() => handleTrueFalse(qIndex, false)}
          className={`flex items-center justify-center gap-3 rounded-2xl border-2 px-6 py-5 text-lg font-bold transition-all duration-300 ${getBtnStyle(false)}`}
        >
          <span className="text-2xl">❌</span> False
        </button>
      </div>
    );
  };

  const renderFillBlank = (exercise, qIndex, userAns, hasFeedback, isCorrect, isDone) => {
    const displayVal = isDone ? exercise.answer : (userAns || "");

    // Split the question text at ___ to show the blank inline
    const parts = exercise.question.split("___");
    const hasBlankInline = parts.length > 1;

    let inputStyle = "border-white/[0.15] bg-white/[0.05] focus:border-violet-500 focus:ring-violet-500/30";
    if (isDone) inputStyle = "border-state-success/50 bg-state-success/10 text-emerald-200";
    else if (hasFeedback && isCorrect) inputStyle = "border-state-success bg-state-success/15 text-emerald-200";
    else if (hasFeedback && !isCorrect) inputStyle = "border-state-danger bg-state-danger/15 text-rose-200";

    return (
      <div className="space-y-4">
        {hasBlankInline ? (
          <p className="text-base leading-relaxed text-ink-low flex flex-wrap items-center gap-2">
            <span>{parts[0]}</span>
            <input
              type="text"
              value={displayVal}
              onChange={(e) => handleFillBlank(qIndex, e.target.value)}
              disabled={isDone || submitted}
              placeholder="type here..."
              className={`inline-block w-40 rounded-xl border-2 px-4 py-2 text-center text-base font-bold outline-none transition-all duration-300 focus:ring-2 ${inputStyle}`}
            />
            <span>{parts[1]}</span>
          </p>
        ) : (
          <input
            type="text"
            value={displayVal}
            onChange={(e) => handleFillBlank(qIndex, e.target.value)}
            disabled={isDone || submitted}
            placeholder="Type your answer..."
            className={`w-full rounded-xl border-2 px-5 py-3 text-base font-bold outline-none transition-all duration-300 focus:ring-2 ${inputStyle}`}
          />
        )}
        {hasFeedback && !isCorrect && (
          <p className="flex items-center gap-2 text-sm font-medium text-state-success">
            <Icon name="lightbulb" size={16} /> Correct answer: <span className="font-bold">{exercise.answer}</span>
          </p>
        )}
      </div>
    );
  };

  const renderMatch = (exercise, qIndex, hasFeedback, isCorrect, isDone) => {
    const state = matchState[qIndex] || { left: null, right: null, matched: [] };
    const { pairs } = exercise;

    // Shuffle right-side definitions (deterministic by qIndex)
    const shuffledDefs = isDone
      ? pairs.map(p => p.definition)
      : [...pairs.map(p => p.definition)].sort(() => {
          return 0.5 - Math.random();
        });

    // For completed state, show the correct matches
    if (isDone) {
      return (
        <div className="space-y-3">
          {pairs.map((pair, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-xl border border-state-success/30 bg-state-success/10 px-4 py-3">
              <span className="text-sm font-bold text-emerald-200">{pair.term}</span>
              <Icon name="arrow-right" size={16} className="text-state-success hidden sm:inline flex-none" />
              <span className="text-sm text-emerald-200/80">{pair.definition}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <p className="text-xs font-medium text-ink-low">Tap one term on the left, then tap its match on the right</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Left column — Terms */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">Terms</p>
            {pairs.map((pair, i) => {
              const isMatched = state.matched.some(m => m.left === pair.term);
              const isActive = state.left === pair.term;
              const isCorrectMatch = hasFeedback && state.matched.some(m => m.left === pair.term && m.right === pair.definition);
              const isWrongMatch = hasFeedback && state.matched.some(m => m.left === pair.term && m.right !== pair.definition);

              let s = "border-white/[0.08] bg-white/[0.02] hover:border-violet-500/50";
              if (isCorrectMatch) s = "border-state-success bg-state-success/15 text-emerald-200";
              else if (isWrongMatch) s = "border-state-danger bg-state-danger/15 text-rose-200";
              else if (isMatched) s = "border-sky/30 bg-sky/10 text-sky-200";
              else if (isActive) s = "border-violet-500 bg-violet-500/20 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]";

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isMatched || submitted}
                  onClick={() => handleMatchSelect(qIndex, "left", pair.term)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${s}`}
                >
                  {pair.term}
                </button>
              );
            })}
          </div>

          {/* Right column — Definitions */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">Definitions</p>
            {shuffledDefs.map((def, i) => {
              const isMatched = state.matched.some(m => m.right === def);
              const isActive = state.right === def;
              const matchedPair = state.matched.find(m => m.right === def);
              const correctPair = pairs.find(p => p.definition === def);
              const isCorrectMatch = hasFeedback && matchedPair && matchedPair.left === correctPair?.term;
              const isWrongMatch = hasFeedback && matchedPair && matchedPair.left !== correctPair?.term;

              let s = "border-white/[0.08] bg-white/[0.02] hover:border-sky/50";
              if (isCorrectMatch) s = "border-state-success bg-state-success/15 text-emerald-200";
              else if (isWrongMatch) s = "border-state-danger bg-state-danger/15 text-rose-200";
              else if (isMatched) s = "border-sky/30 bg-sky/10 text-sky-200";
              else if (isActive) s = "border-sky bg-sky/20 text-white shadow-[0_0_12px_rgba(56,189,248,0.3)]";

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isMatched || submitted}
                  onClick={() => handleMatchSelect(qIndex, "right", def)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${s}`}
                >
                  {def}
                </button>
              );
            })}
          </div>
        </div>

        {state.matched.length > 0 && !submitted && (
          <button
            type="button"
            onClick={() => resetMatch(qIndex)}
            className="mt-2 text-xs font-medium text-ink-low hover:text-ink-hi transition-colors"
          >
            ↻ Reset matches
          </button>
        )}

        {hasFeedback && !isCorrect && (
          <div className="mt-3 space-y-1.5">
            <p className="text-xs font-bold text-state-success flex items-center gap-1">
              <Icon name="lightbulb" size={14} /> Correct matches:
            </p>
            {pairs.map((pair, i) => (
              <p key={i} className="text-xs text-state-success/80 pl-5">
                {pair.term} → {pair.definition}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Get exercise type badge
  const getTypeBadge = (type) => {
    switch (type) {
      case "true-false":
        return { label: "True or False", icon: "check-circle", color: "text-amber-400 bg-amber-500/15 border-amber-500/30" };
      case "fill-blank":
        return { label: "Fill in the Blank", icon: "edit-3", color: "text-sky bg-sky/15 border-sky/30" };
      case "match":
        return { label: "Match the Pairs", icon: "code", color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" };
      case "mcq":
      default:
        return { label: "Multiple Choice", icon: "check-circle", color: "text-violet-400 bg-violet-500/15 border-violet-500/30" };
    }
  };

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent p-5 shadow-inner md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 border-b border-white/[0.08] pb-4">
        <h4 className="flex items-center gap-3 text-xl font-extrabold text-ink-hi">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]">
            <Icon name="edit-3" size={16} />
          </span>
          Module Challenge
        </h4>
        <p className="mt-2 text-sm text-ink-low">
          Answer all {totalQ} questions correctly to unlock the next module.
        </p>
        {/* Score indicator */}
        {submitted && (
          <div className={`mt-3 flex items-center gap-2 text-sm font-bold ${allCorrect ? "text-state-success" : "text-state-danger"}`}>
            <Icon name={allCorrect ? "check-circle" : "alert-circle"} size={18} />
            {allCorrect ? `Perfect! ${correctCount}/${totalQ} correct! 🎉` : `${correctCount}/${totalQ} correct — review and try again!`}
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {exercises.map((exercise, qIndex) => {
          const typeBadge = getTypeBadge(exercise.type);

          return (
            <div key={qIndex} className="animate-fade-up" style={{ animationDelay: `${qIndex * 80}ms` }}>
              {/* Question header */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-violet-400">Q{qIndex + 1}.</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${typeBadge.color}`}>
                  <Icon name={typeBadge.icon} size={12} />
                  {typeBadge.label}
                </span>
              </div>

              {/* Question text */}
              <p className="mb-4 text-sm font-bold text-ink-hi leading-relaxed whitespace-pre-line">
                {exercise.question}
              </p>

              {/* Exercise body */}
              {renderExercise(exercise, qIndex)}
            </div>
          );
        })}
      </div>

      {/* Submit/Retry area */}
      {!isCompleted && (
        <div className="mt-8 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {submitted && !allCorrect ? (
            <>
              <p className="text-sm font-bold text-state-danger flex items-center gap-2">
                <Icon name="alert-circle" size={18} /> Review the highlighted answers and try again!
              </p>
              <Button onClick={handleRetry} variant="secondary">
                Try Again
              </Button>
            </>
          ) : submitted && allCorrect ? (
            <p className="text-sm font-bold text-state-success flex items-center gap-2 mx-auto">
              <Icon name="check-circle" size={18} /> All correct! Module complete! 🎉
            </p>
          ) : (
            <>
              <p className="text-sm text-ink-low">
                {allAnswered ? "Ready to submit!" : `Answer all ${totalQ} questions to proceed.`}
              </p>
              <Button
                onClick={handleSubmitAll}
                disabled={!allAnswered || saving}
                loading={saving}
                className="w-full sm:w-auto px-8"
              >
                Submit Answers
              </Button>
            </>
          )}
        </div>
      )}

      {/* Completed state */}
      {isCompleted && (
        <div className="mt-8 rounded-xl bg-state-success/10 p-4 border border-state-success/20 text-center animate-fade-in">
          <p className="flex items-center justify-center gap-2 text-lg font-bold text-state-success">
            <Icon name="check-circle" size={24} /> Module Mastered!
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciseEngine;
