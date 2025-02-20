"use client";

import { AddTimerForm } from "./composants/AddTimerForm";
import { useTimerInterval, useTimerStore } from "./useTimerStore";
import { Timer } from "./composants/Timer";

export default function Home() {
  useTimerInterval();
  return (
    <main className="mx-auto min-h-full flex max-w-4xl flex-col gap-8 p-4 ">
      <h1>Timer</h1>
      <AddTimerForm />
      <Timers />
    </main>
  );
}

const Timers = () => {
  const timers = useTimerStore((s) => s.timers);

  return (
    <div className="flex flex-wrap gap-4">
      {timers.map((timer) => (
        <Timer key={timer.id} timer={timer} />
      ))}
    </div>
  );
};

const millisecondsToHms = (ms) => {
  const hrs = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);

  return { hrs, mins, secs};
};

const padHms = (timeHms) => ({
  hrs: String(timeHms.hrs).padStart(2,"0"),
  mins: String(timeHms.mins).padStart(2,"0"),
  secs: String(timeHms.secs).padStart(2,"0"),
});

const getTimeText = (timeLeft) => {
  const timeLeftHms = millisecondsToHms(timeLeft);
  const timeLeftPadHms = padHms(timeLeftHms)
};
