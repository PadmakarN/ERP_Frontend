import { useEffect, useState } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Trash2,
  Info,
} from "lucide-react";

const styles = {
  success: {
    bg: "bg-green-500",
    icon: <CheckCircle size={22} />,
  },
  error: {
    bg: "bg-red-500",
    icon: <AlertCircle size={22} />,
  },
  warning: {
    bg: "bg-yellow-400 text-black",
    icon: <AlertTriangle size={22} />,
  },
  delete: {
    bg: "bg-orange-500",
    icon: <Trash2 size={22} />,
  },
  info: {
    bg: "bg-blue-500",
    icon: <Info size={22} />,
  },
};

export default function Notification({
  notification,
  onClose,
  duration = 2000,
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!notification) return;
    setProgress(100);
    const total = duration;
    const interval = 30;
    const step = 100 / (total / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [notification]);
  if (!notification) return null;
  const current = styles[notification.variant] || styles.info;
  return (
    <div className="fixed top-5 right-5 z-50 animate-[slideIn_.3s_ease]">
      <div
        className={`w-[350px] rounded-lg shadow-2xl overflow-hidden ${current.bg}`}
      >
        <div className="flex justify-between items-start p-4">
          <div className="flex gap-3">
            <div>{current.icon}</div>

            <div>
              <h3 className="font-bold">{notification.title}</h3>

              <p className="text-sm mt-1">{notification.message}</p>
            </div>
          </div>

          <button onClick={onClose} className="hover:opacity-70">
            <X size={18} />
          </button>
        </div>

        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
