import { HTMLInputTypeAttribute, useId } from "react";

export default function BetterInput({
  type,
  className,
  placeholder,
  name,
  defaultValue,
}: {
  type: HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
}) {
  const uniqueId = useId();

  return (
    <div className="relative">
      <input
        type={type}
        id={uniqueId}
        placeholder=" "
        className={`${className} border peer pl-2 outline-0 rounded-sm w-full`}
        name={name}
        defaultValue={defaultValue}
        required
      />
      <label
        htmlFor={uniqueId}
        className="absolute left-0 scale-50 -top-1/2 bg-amber-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 peer-placeholder-shown:left-2 peer-placeholder-shown:bg-transparent transition-all duration-300 peer-focus:scale-50 peer-focus:-top-1/2 peer-focus:bg-amber-50 peer-focus:left-0 cursor-text"
      >
        {placeholder}
      </label>
    </div>
  );
}
