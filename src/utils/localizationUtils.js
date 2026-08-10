/**
 * Helper utilities to dynamically localize Course and Quiz data objects
 * based on the current active language in LanguageContext (t function).
 *
 * t(path) returns the translated string or the key path if not found.
 * We use the original English value as a comparison to detect missing keys.
 */

export const getLocalizedCourse = (course, t) => {
  if (!course || !t) return course;
  const cId = course.id;

  // t() returns the key path string if the key is missing, so we check
  // if the result equals the dot-path and fall back to the original value.
  const resolve = (key, fallback) => {
    const result = t(key);
    return result === key ? fallback : result;
  };

  const title = resolve(`courseData.${cId}.title`, course.title);
  const desc = resolve(`courseData.${cId}.desc`, course.desc);
  const category = resolve(`courseData.${cId}.category`, course.category);
  const difficulty = resolve(`courseData.${cId}.difficulty`, course.difficulty);

  const syllabus = (course.syllabus || []).map((m, mIdx) => {
    const mTitle = resolve(`courseData.${cId}.modules.${mIdx}.title`, m.title);
    const mDesc = resolve(`courseData.${cId}.modules.${mIdx}.desc`, m.desc);

    return {
      ...m,
      title: mTitle,
      desc: mDesc,
    };
  });

  return {
    ...course,
    title,
    desc,
    category,
    difficulty,
    syllabus,
  };
};

export const getLocalizedQuiz = (quiz, t) => {
  if (!quiz || !t) return quiz;
  const qId = quiz.id;

  const resolve = (key, fallback) => {
    const result = t(key);
    return result === key ? fallback : result;
  };

  const title = resolve(`quizzesData.${qId}.title`, quiz.title);
  const description = resolve(`quizzesData.${qId}.description`, quiz.description);
  const subject = resolve(`quizzesData.${qId}.subject`, quiz.subject);

  return {
    ...quiz,
    title,
    description,
    subject,
  };
};
