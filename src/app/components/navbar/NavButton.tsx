import { ReactNode } from "react";

export default function NavButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${className} cursor-pointer `}>{children}</div>;
}
