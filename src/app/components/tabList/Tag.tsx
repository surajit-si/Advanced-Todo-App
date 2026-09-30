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
      className={`${className}  w-fit px-3 rounded-sm shrink-0 cursor-pointer shadow-md! shadow-black/20 `}
    >
      {title}
    </div>
  );
}
