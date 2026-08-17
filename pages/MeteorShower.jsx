import React, { useMemo } from "react";

const METEOR_COUNT = 7;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const MeteorShower = () => {
  const meteors = useMemo(
    () =>
      Array.from({ length: METEOR_COUNT }).map((_, i) => ({
        id: i,
        top: randomBetween(-10, 45),
        left: randomBetween(0, 90),
        delay: randomBetween(0, 10),
        duration: randomBetween(2.2, 4),
        length: randomBetween(90, 160),
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
            width: `${m.length}px`,
          }}
        />
      ))}
      <style jsx>{`
        .meteor {
          position: absolute;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0)
          );
          border-radius: 999px;
          transform: rotate(35deg);
          opacity: 0;
          filter: drop-shadow(0 0 6px rgba(180, 200, 255, 0.9));
          animation-name: meteorFly;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }
        .meteor::before {
          content: "";
          position: absolute;
          right: 0;
          top: -1.5px;
          width: 5px;
          height: 5px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.9);
        }
        @keyframes meteorFly {
          0% {
            transform: translate(0, 0) rotate(35deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          75% {
            opacity: 0.7;
          }
          100% {
            transform: translate(480px, 340px) rotate(35deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MeteorShower;
