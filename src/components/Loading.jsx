import React, { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return Math.min(prev + Math.floor(Math.random() * 8) + 3, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-gray-900/50
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-[420px]
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="mb-6">
          <h2
            className="
              text-2xl
              font-bold
              text-[#03233A]
            "
          >
            PNERP
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Loading your workspace...
          </p>
        </div>

        {/* Progress */}

        <div
          className="
            relative
            h-4
            overflow-hidden
            rounded-full
            bg-slate-200
          "
        >
          <div
            style={{ width: `${progress}%` }}
            className="
              relative
              h-full
              rounded-full
              bg-gradient-to-r
              from-[#03233A]
              via-sky-500
              to-cyan-400
              transition-all
              duration-300
              shadow-[0_0_20px_rgba(14,165,233,0.5)]
            "
          >
            {/* Shine Effect */}

            <div
              className="
                absolute
                inset-y-0
                w-16
                -skew-x-12
                animate-pulse
                bg-white/40
              "
            />
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            text-sm
            font-medium
          "
        >
          <span className="text-slate-500">
            Please wait...
          </span>

          <span className="text-[#03233A]">
            {progress}%
          </span>
        </div>

        {/* Loading Dots */}

        <div
          className="
            mt-5
            flex
            justify-center
            gap-2
          "
        >
          <div className="h-2 w-2 animate-bounce rounded-full bg-[#03233A]" />
          <div
            className="
              h-2
              w-2
              animate-bounce
              rounded-full
              bg-sky-500
              [animation-delay:0.15s]
            "
          />
          <div
            className="
              h-2
              w-2
              animate-bounce
              rounded-full
              bg-cyan-400
              [animation-delay:0.3s]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;