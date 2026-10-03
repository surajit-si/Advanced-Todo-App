import { CirclePlus, SquarePen } from "lucide-react";
import NavButton from "./NavButton";

export default function Navbar() {
  return (
    <div className="max-sm:h-12 w-full bg-primary flex justify-center items-center text-amber-50 ">
      <div className="shrink-0 w-full flex p-2 gap-2">
        <form action="#" className="flex-1 shrink-0">
          <select name="profile" id="profileSelection" className=" w-full ">
            <option value="guest">Guest</option>
          </select>
        </form>
        {/* Edit Button */}
        <NavButton className="">
          <SquarePen color="#ffffff" />
        </NavButton>
        {/* Add Button */}
        <NavButton>
          <CirclePlus color="#ffffff" />
        </NavButton>
      </div>
    </div>
  );
}
