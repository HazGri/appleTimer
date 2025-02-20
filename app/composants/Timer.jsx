import { useTimerStore } from "../useTimerStore";
import { clsx } from "clsx";
import { CircularProgress } from "./CircularProgress";
import { X, Pause, Play, RotateCcw,Bell } from "lucide-react";


export const Timer = ({ timer }) => {
  localStorage.clear();
  const endAt = new Date(timer.endAt);
  const timeText = getTimeText(timer.timeLeft);
  return (
    <div
      className={clsx(
        "relative flex size-[224px] flex-col gap-2 rounded-2xl bg-base-200 p-4",
        {
          "brightness-75": timer.timeLeft === 0,
        }
      )}
    >
      <div className="relative flex size-full flex-col items-center justify-center gap-1">
        <CircularProgress
          className="absolute"
          timeLeft={timer.timeLeft}
          duration={timer.duration}
          width={180}
          radiusRatio={0.9}
        />
        <div className="flex items-center justify-between flex-col gap-2">
          <Bell size={16} className="text-neutral-content" />
          <p>{`${endAt.getHours()}:${endAt
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}</p>
          <TimeDisplay timeLeft={timer.timeLeft} />
          <DurationDisplay duration={timer.duration} />
        </div>
      </div>
        <TimerControls {...timer} />
    </div>
  );
};
const TimerControls = ({ id, isRunning, timeLeft }) => {
  const removeTimer = useTimerStore((s) => s.removeTimer);
  const toggleRunning = useTimerStore((s) => s.toggleRunning);

  return (
    <>
      <button
        className="absolute bottom-3 left-3 flex size-7 items-center justify-center rounded-full bg-base-300 p-0"
        onClick={() => removeTimer(id)}
      >
        <X size={14} />
      </button>
      <button
        className={clsx(
          "absolute bottom-3 right-3 flex size-7 items-center justify-center rounded-full p-0",
          {
            "bg-warning text-warning-content": isRunning,
            "bg-success text-success-content": !isRunning,
          }
        )}
        onClick={() => toggleRunning(id)}
      >
        {isRunning ? (
          <Pause fill="currentColor" size={14} />
        ) : timeLeft > 0 ? (
          <Play fill="currentColor" size={14} />
        ) : (
          <RotateCcw size={14} />
        )}
      </button>
    </>
  );
};

const TimeDisplay = ({ timeLeft }) => {
  const timeText = getTimeText(timeLeft);
  const timeHms = millisecondsToHms(timeLeft);
  return (
    <div className="relative flex items-center justify-center">
      <p
        className={clsx("font-light text-base-content", {
          "text-4xl": !timeHms.hrs,
          "text-2xl": timeHms.hrs,
        })}
      >
        {timeText}
      </p>
    </div>
  );
};

const DurationDisplay = ({ duration }) => {
  const text = getDurationText(duration);
  return (
    <div>
      <p className="text-sm text-neutral-content">{text}</p>
    </div>
  );
};

const millisecondsToHms = (ms) => {
  const hrs = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);

  return { hrs, mins, secs };
};

const padHms = (timeHms) => ({
  hrs: String(timeHms.hrs).padStart(2, "0"),
  mins: String(timeHms.mins).padStart(2, "0"),
  secs: String(timeHms.secs).padStart(2, "0"),
});

const getTimeText = (timeLeft) => {
  const timeLeftHms = millisecondsToHms(timeLeft);
  const timeLeftPadHms = padHms(timeLeftHms);

  let durationText = `${timeLeftPadHms.mins}:${timeLeftPadHms.secs}`;

  if (timeLeftHms.hrs) {
    durationText = `${timeLeftPadHms.hrs}:${durationText}`;
  }

  return durationText;
};

const getDurationText = (duration) => {
  const durationHms = millisecondsToHms(duration);

  if (durationHms.hrs) {
    return `${durationHms.hrs} hrs`;
  }
  if (durationHms.mins) {
    return `${durationHms.mins} mins`;
  }
  return `${durationHms.secs} secs`;
};
