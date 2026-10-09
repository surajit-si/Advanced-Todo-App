import Tag from "./Tag";

export default function TodoSection({
  className,
  tagList,
  setFn,
}: {
  className?: string;
  tagList: string[];
  setFn?: (todoTagList: string[]) => void;
}) {
  return (
    <div
      className={`${className} hide-scrollbar flex overflow-x-scroll gap-1.5`}
    >
      {/* Tags */}

      {tagList.length <= 0 && <Tag name="Example" />}
      {tagList.length >= 0 &&
        tagList.map((tag) => {
          const removeFn = () => {
            setFn?.(tagList.filter((val) => val !== tag));
          };

          return <Tag name={tag} key={tag} Fn={removeFn} />;
        })}
    </div>
  );
}

/* 
then removing Fn It is not updating
*/
