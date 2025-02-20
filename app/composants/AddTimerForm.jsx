"use client";
import { useTimerStore } from "../useTimerStore";
import { useState } from "react";

export const AddTimerForm = () => {
  const [time, setTime] = useState({ hrs: 0, mins: 1, secs: 0 });
  const addTimer = useTimerStore((s) => s.addTimer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const formatedValue = setTime((currTime) => ({
      ...currTime,
      [name]: formatedTimeValue(value, name === "hrs" ? 23 : 59),
    }));
  };

  const handleAddTImer = () => {
    const ms = time.hrs * 3600000 + time.mins * 60000 + time.secs * 1000;
    if (ms < 10000) {
      alert("Timer must be at least 10 seconds");
      return;
    }
    addTimer(ms);
  };

  return (
    <div className=" mx-auto gap-4 flex flex-col w-fit">
      <div className="flex items-center justify-between">
        {["hr", "min", "sec"].map((label) => (
          <p className="text-center w-full font-bold" key={label}>
            {label}
          </p>
        ))}
      </div>
      <div className="flex items-center rounded-md border-neutral border bg-base-200 p-2">
        <InputField
          value={String(time.hrs).padStart(2, "0")}
          onChange={handleInputChange}
          name="hrs"
        />
        <p className="text-lg">:</p>
        <InputField
          value={String(time.mins).padStart(2, "0")}
          onChange={handleInputChange}
          name="mins"
        />
        <p className="text-lg">:</p>
        <InputField
          value={String(time.secs).padStart(2, "0")}
          onChange={handleInputChange}
          name="secs"
        />
      </div>
          <button
            className="btn-success btn self-center"
            onClick={() => {
              handleAddTImer();
            }}
          >
            Add Timer
          </button>
    </div>
  );
};

const InputField = (props) => {
  return (
    <input
      {...props}
      className="h-24 w-20 focus:outline-none rounded-md bg-base-200 text-center text-5xl focus:bg-accent focus:text-accent-content"
    />
  );
};

const formatedTimeValue = (value, maxValue) => {
  const intValue = parseInt(value, 10);

  if (isNaN(intValue)) return 0;
  return Math.min(Number(intValue.toString().slice(-2)), maxValue);
};
