// Clay surface card. Set `hoverable` for the lift-on-hover interaction used by
// clickable cards (courses, quizzes). Surface + clay shadow come from `.glass`.

const Card = ({ hoverable = false, className = "", children, ...rest }) => (
  <div
    className={`glass rounded-2xl transition-all duration-300
      ${hoverable ? "cursor-pointer hover:-translate-y-1.5 hover:border-violet-500/35 hover:bg-surface-2" : ""}
      ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
