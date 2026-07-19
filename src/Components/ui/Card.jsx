// Glass surface card. Set `hoverable` for the lift-on-hover interaction used by
// clickable cards (courses, quizzes).

const Card = ({ hoverable = false, className = "", children, ...rest }) => (
  <div
    className={`glass rounded-2xl shadow-card transition-all duration-300
      ${hoverable ? "hover:-translate-y-1.5 hover:border-violet-500/35 hover:bg-white/[0.055] hover:shadow-glow" : ""}
      ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
