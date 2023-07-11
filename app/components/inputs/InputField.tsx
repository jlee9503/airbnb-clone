"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const InputField = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute top-5 left-2 text-neutral-700"
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`w-full p-4 pt-5 peer font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
      />
      <label
        className={`absolute top-4 origin-[0] transform -translate-y-3 text-base z-10 duration-150 ${formatPrice ? "left-9" : "left-4"} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
