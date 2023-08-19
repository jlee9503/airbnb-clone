"use client";

import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Conuter = ({ title, subtitle, value, onChange }: CounterProps) => {
  const addCounter = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const reduceCounter = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="cursor-pointer w-10 h-10 flex justify-center items-center rounded-full border-[1px] border-neutral-400 text-neutral-600 hover:opacity-80 transition" onClick={reduceCounter}>
          <AiOutlineMinus />
        </div>
        <div className="text-xl text-neutral-600 font-light">{value}</div>
        <div className="cursor-pointer w-10 h-10 flex justify-center items-center rounded-full border-[1px] border-neutral-400 text-neutral-600 hover:opacity-80 transition" onClick={addCounter}>
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Conuter;
