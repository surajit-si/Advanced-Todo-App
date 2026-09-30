import { CirclePlus, CircleUserRound, ClipboardList } from "lucide-react";

export default function BottomNavbar({ className }: { className?: string }) {
  return (
    <div className={`${className} absolute bottom-0 w-full`}>
      <div
        className={` w-full h-10 flex flex-row justify-between px-16 border-t border-[black]/40 items-center relative`}
      >
        {/* Todo Menu */}
        <ClipboardList color="#3A86FF" />
        <span className="dummy hidden"></span>
        <CircleUserRound className="text-primary" />

        {/* Todo Add Button */}
        <div className="todoAddButton aspect-square w-14 bg-primary absolute left-1/2 rounded-full -translate-x-1/2 -top-1/2 flex justify-center items-center text-white text-2xl cursor-pointer">
          <CirclePlus />
        </div>
      </div>
    </div>
  );
}
