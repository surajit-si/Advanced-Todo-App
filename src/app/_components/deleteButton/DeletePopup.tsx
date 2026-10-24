import { ReactNode } from "react";
import ButtonForDeleteComp from "./Button";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

export default function DeletePopup({
  children,
  leftSideButtonName = "Cancel",
  leftSideButtonClassName,
  leftSideButtonCallback,
  rightSideButtonName = "Delete",
  rightSideButtonClassName,
  rightSideButtonCallback,
  className,
  contsiner,
}: {
  className?: string;
  children?: ReactNode;
  leftSideButtonName?: string;
  leftSideButtonClassName?: string;
  leftSideButtonCallback: () => void;
  rightSideButtonName?: string;
  rightSideButtonClassName?: string;
  rightSideButtonCallback: () => void;
  contsiner: Element | DocumentFragment;
}) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.8 }}
      transition={{ duration: 0.25 }}
      className={`${className} bg-amber-50 pt-8 pb-8 rounded-3xl w-8/10 min-w-60 max-w-80 shadow-[0_0_20px_rgba(0,0,0,0.5)]! flex flex-col justify-center items-center gap-4`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children || <h1 className="text-2xl">Are you sure?</h1>}
      {/* Buttons */}
      <div className="w-full flex gap-4 px-4">
        {/* Delete Button */}

        <ButtonForDeleteComp
          callback={leftSideButtonCallback}
          name={leftSideButtonName}
          className={leftSideButtonClassName}
        />
        <ButtonForDeleteComp
          callback={rightSideButtonCallback}
          name={rightSideButtonName}
          className={rightSideButtonClassName}
        />
      </div>
    </motion.div>,
    contsiner,
  );
}
