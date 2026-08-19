function CalculatorButton({
  children,
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-14 rounded-xl text-xl font-semibold shadow-sm transition duration-150 active:scale-95 hover:shadow-md ${className}`}
    >
      {children}
    </button>
  );
}

export default CalculatorButton;