"use client";

export default function DatetimeInput({
  className,
  date,
}: {
  className?: string;
  date: Date;
}) {
  // selected Date String
  const selectedDateString = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()} , ${date.getHours() >= 12 ? date.getHours() - 12 : date.getHours()} : ${date.getMinutes()} ${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;

  // 16 / 04/ 2007 , 07:00 AM

  return (
    <div className="flex gap-2">
      <p className="border flex justify-center items-center text-text-primary flex-1 rounded-lg">
        {selectedDateString}
      </p>
      <button
        onClick={() => {
          (
            document.getElementById("dateTime") as HTMLInputElement
          ).showPicker();
        }}
        type="button"
        className="py-1.5 px-6 cursor-pointer rounded-full bg-primary text-white "
      >
        Select
      </button>
    </div>
  );
}
