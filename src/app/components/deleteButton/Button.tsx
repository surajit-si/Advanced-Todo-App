export default function ButtonForDeleteComp({
  className,
  name,
}: {
  className?: string;
  name: string;
}) {
  return (
    <button
      className={`${className} border h-12 w-32 rounded-3xl text-sm  font-semibold cursor-pointer hover:scale-102 transition-transform duration-300`}
    >
      {name}
    </button>
  );
}
