import { ReactNode } from "react";
import ButtonForDeleteComp from "./Button";

export default function DeletePopup({
  children,
  leftSideButtonName,
  leftSideButtonClassName,
  rightSideButtonName,
  rightSideButtonClassName,
  className,
}: {
  className?: string;
  children: ReactNode;
  leftSideButtonName: string;
  leftSideButtonClassName: string;
  rightSideButtonName: string;
  rightSideButtonClassName: string;
}) {
  return (
    <div
      className={`${className} bg-amber-50 pt-8 pb-8 rounded-3xl w-8/10 min-w-60 max-w-80 shadow-[0_0_20px_rgba(0,0,0,0.5)]! flex flex-col justify-center items-center gap-4`}
    >
      {children || <h1 className="text-2xl">Are you sure?</h1>}
      {/* Buttons */}
      <div className="w-full flex gap-4 px-4">
        {/* Delete Button */}

        <ButtonForDeleteComp
          name={leftSideButtonName}
          className={leftSideButtonClassName}
        />
        <ButtonForDeleteComp
          name={rightSideButtonName}
          className={rightSideButtonClassName}
        />
      </div>
    </div>
  );
}
