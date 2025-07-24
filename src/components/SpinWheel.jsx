import { useEffect, useRef } from "react";
import { Howl } from "howler";
import toast from "react-hot-toast";

const SpinWheel = ({ items, onSpinEnd }) => {
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !items.length) return;

    const segments = items.map((item) => ({
      text: item,
      fillStyle: getColor(index),
    }));

    const theWheel = new Winwheel({
      canvasId: "canvas",
      numSegments: segments.length,
      segments,
      animation: {
        type: "spinToStop",
        duration: 5,
        spins: 8,
        callbackFinished: null, // ← ПОКИ НЕ ДАЄМО
      },
    });

    // Присвоїмо callback окремо, щоб точно потрапило
    theWheel.animation.callbackFinished = function (segment) {
      console.log("✅ Spin completed! Segment:", segment?.text);
      toast.success(`🎯 Випало: ${segment?.text}`);
      onSpinEnd?.(segment?.text); // ← передаємо результат в App
    };

    wheelRef.current = theWheel;
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
    <div
      style={{ position: "relative", width: 400, height: 400 }}
      className="relative"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%) rotate(180deg)",
          width: 0,
          height: 0,
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderBottom: "30px solid #333",
          zIndex: 2,
        }}
      />
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
          fontSize: "18px",
          zIndex: 3,
        }}
      >
        Spin
      </button>
    </div>
  );
};

const tickSound = new Howl({
  src: ["/tick.mp3"],
  volume: 0.5,
});

const colors = [
  "#f06b54",
  "#df58af",
  "#80c183",
  "#6cdfb3",
  "#966ca1",
  "#886f9a",
  "#c2ad50",
  "#fdb516",
  "#8b5e68",
  "#28ada0",
  "#eb8435",
  "#fc82af",
  "#f7e0ef",
  "#e3dff3",
  "#dea536",
  "#06b456",
  "#0cc1cf",
  "#fcc83d",
  "#977764",
  "#17b5de",
  " #658c49",
];

const getColor = (index) => colors[index % colors.length];

export default SpinWheel;
