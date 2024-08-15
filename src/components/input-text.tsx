"use client";

import React, { useId } from "react";

type TTextInput = React.ComponentProps<"input"> & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  icon?: React.ReactElement;
  className?: string;
};

const InputText: React.FC<TTextInput> = ({
  label,
  onChange,
  value,
  icon,
  className,
  ...props
}) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
    >
      <input
        {...props}
        onChange={onChange}
        id={id}
        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      />

      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
        {label}
      </span>
    </label>
  );
};

export default InputText;
