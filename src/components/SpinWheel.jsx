import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SpinButton from "./SpinButton";

function SpinWheel({ items = [], onSpinEnd = () => {} }) {
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);

  const spin = () => {
    if (spinning || items.length === 0) return;

    const segmentAngle = 360 / items.length;
    const randomIndex = Math.floor(Math.random() * items.length);
    const targetAngle = 3600 + randomIndex * segmentAngle + segmentAngle / 2;

    setSpinning(true);

    wheelRef.current.style.transition =
      "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
    wheelRef.current.style.transform = `rotate(-${targetAngle}deg)`;

    setTimeout(() => {
      setSpinning(false);
      onSpinEnd(items[randomIndex]);
    }, 4000);
  };

  const radius = 150;
  const center = radius;
  const textRadius = radius * 0.65;

  const renderSectors = () => {
    const angle = 360 / items.length;
    return items.map((item, i) => {
      const rotate = angle * i;
      const fill = `hsl(${(i * 137.5) % 360}, 70%, 70%)`;
      const x =
        center +
        textRadius * Math.cos((Math.PI * 2 * i) / items.length - Math.PI / 2);
      const y =
        center +
        textRadius * Math.sin((Math.PI * 2 * i) / items.length - Math.PI / 2);

      function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
          x: centerX + radius * Math.cos(angleInRadians),
          y: centerY + radius * Math.sin(angleInRadians),
        };
      }

      function describeArc(x, y, radius, startAngle, endAngle) {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        const d = [
          "M",
          x,
          y,
          "L",
          start.x,
          start.y,
          "A",
          radius,
          radius,
          0,
          largeArcFlag,
          0,
          end.x,
          end.y,
          "Z",
        ].join(" ");

        return d;
      }

      return (
        <g key={i}>
          <path
            d={describeArc(center, center, radius, angle * i, angle * (i + 1))}
            fill={fill}
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={x}
            y={y}
            fill="black"
            fontSize="12"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${rotate}, ${x}, ${y})`}
          >
            {item}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="relative w-[300px] h-[300px]">
      <div className="absolute top-1/2 left-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-red-500 transform -translate-x-1/2 -translate-y-full z-10" />
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="rounded-full"
        onClick={spin}
      >
        <g ref={wheelRef} transform={`rotate(0, ${center}, ${center})`}>
          {renderSectors()}
        </g>
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <SpinButton onClick={spin} disabled={spinning || items.length === 0} />
      </div>
    </div>
  );
}

export default SpinWheel;
