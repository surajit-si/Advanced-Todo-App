import { HTMLInputTypeAttribute, ReactNode, useId } from "react";

export default function BetterInput({
  type,
  className,
  placeholder,
  name,
  defaultValue,
  parentClassName,
  lebelClassName,
  id,
  children,
  onChange,
  onKeyDown,
  tabIndex,
  required = true,
  autoComplete = "off",
}: {
  type: HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  parentClassName?: string;
  lebelClassName?: string;
  id?: string;
  children?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  tabIndex?: number;
  required?: boolean;
  autoComplete?: "on" | "off";
}) {
  const uniqueId = useId();

  return (
    <div className={`${parentClassName} relative`}>
      <input
        type={type}
        id={id || uniqueId}
        placeholder=" "
        className={`${className} border peer pl-2 outline-0 rounded-sm w-full h-full`}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        required={required}
        autoComplete={autoComplete}
      />
      {placeholder && (
        <label
          htmlFor={uniqueId}
          className={`${lebelClassName} absolute left-2 top-0 -translate-y-1/2 scale-50 origin-left bg-amber-50 px-1
             peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100
             peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0
             peer-focus:top-0 peer-focus:left-2 peer-focus:scale-50 peer-focus:bg-amber-50 peer-focus:px-1
             transition-all duration-300 cursor-text`}
        >
          {placeholder}
        </label>
      )}
      {children}
    </div>
  );
}
