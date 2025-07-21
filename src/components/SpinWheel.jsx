import { useEffect, useRef } from "react";
import { Howl } from "howler";
import SpinButton from "./SpinButton";

const SpinWheel = ({ items, onSpinEnd }) => {
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    if (!items.length) return;

    wheelRef.current = new window.Winwheel({
      canvasId: "canvas",
      numSegments: items.length,
      outerRadius: 150,
      textFontSize: 16,
      segments: items.map((item, i) => ({
        fillStyle: getColor(i),
        text: item,
      })),
      animation: {
        type: "spinToStop",
        duration: 5,
        spins: 8,
        callbackFinished: (indicatedSegment) => {
          if (onSpinEnd) onSpinEnd(indicatedSegment.text);
        },
        callbackSound: () => tickSound.play(),
        soundTrigger: "pin",
      },
      pins: {
        number: items.length,
        fillStyle: "silver",
        outerRadius: 4,
      },
    });
  }, [items]);

  const spinWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.stopAnimation(false);
      wheelRef.current.rotationAngle = 0;
      wheelRef.current.draw();
      wheelRef.current.startAnimation();
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg relative w-[400] h-[400]">
      <canvas id="canvas" width="400" height="400" ref={canvasRef} />
      <button
        onClick={spinWheel}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#f87171",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
        }}
      >
        Spin
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </div>
  );
};

const tickSound = new Howl({
  src: ["/tick.mp3"],
  volume: 0.5,
});

const colors = [
  "#f87171",
  "#60a5fa",
  "#34d399",
  "#facc15",
  "#a78bfa",
  "#fb923c",
  "#f472b6",
];

const getColor = (index) => colors[index % colors.length];

export default SpinWheel;
