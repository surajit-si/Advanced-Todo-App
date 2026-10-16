export default function ButtonForDeleteComp({
  className,
  name,
  callback,
}: {
  className?: string;
  name: string;
  callback: () => void;
}) {
  return (
    <button
      className={`${className} border h-12 w-32 rounded-3xl text-sm  font-semibold cursor-pointer hover:scale-102 transition-transform duration-300`}
      onClick={(e) => {
        e.stopPropagation();
        callback();
      }}
    >
      {name}
    </button>
  );
}
