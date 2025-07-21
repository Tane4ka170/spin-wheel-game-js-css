const SpinButton = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`z-20 w-20 h-20 bg-green-800 text-green-200 font-bold rounded-full border-4 border-green-400 uppercase
        flex justify-center items-center transition duration-300
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-700 active:scale-95"
        }`}
      aria-label="Spin the wheel"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19V5m0 0l-7 7m7-7l7 7"
        />
      </svg>
    </button>
  );
};

export default SpinButton;
