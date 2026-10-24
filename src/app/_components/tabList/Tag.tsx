export default function Tag({
  className,
  title,
  onClick,
}: {
  className?: string;
  title: string;
  onClick?: () => void;
}) {
  function onClickHandler() {
    return null;
  }

  return (
    <div
      onClick={onClick || onClickHandler}
      className={`${className}  w-fit px-3 rounded-lg shrink-0 cursor-pointer border-gray-300 border shadow-[0_0_10px_rgba(0,0,0,0.4)] hover:shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-all duration-300 `}
    >
      {title}
    </div>
  );
}
