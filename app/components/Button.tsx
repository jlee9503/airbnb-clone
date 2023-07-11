"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      className={`relative w-full rounded-lg hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed py-2 border-2 font-semibold
      ${outline ? "bg-white" : "bg-rose-500"} 
      ${outline ? "border-black" : "border-rose-500"} 
      ${outline ? "text-black" : "text-white"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-2" />}
      {label}
    </button>
  );
};

export default Button;
