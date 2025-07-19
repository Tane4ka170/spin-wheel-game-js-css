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
    >
      Spin
    </button>
  );
};

export default SpinButton;
