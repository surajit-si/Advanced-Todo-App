import { X } from "lucide-react";

export default function Tag({ name, Fn }: { name: string; Fn?: () => void }) {
  return (
    <div className="text-sm text-text-primary border py-1 pl-2 pr-6 rounded-full relative">
      {name}
      <div title="remove">
        <X
          strokeWidth={3}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
          size={"1rem"}
          onClick={Fn}
        />
      </div>
    </div>
  );
}
