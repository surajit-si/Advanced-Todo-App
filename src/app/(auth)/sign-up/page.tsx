import BetterInput from "./BetterInput";

export default function SignUp() {
  return (
    <div className="p-4 rounded-3xl border flex flex-col items-center justify-center gap-1">
      <h1 className="text-3xl font-normal">Sign Up</h1>
      <p className="text-sm">Sign up to get started</p>
      {/* Form */}
      <form action="" className="flex flex-col gap-2 min-w-60 w-80 max-w-100">
        <BetterInput />
      </form>
    </div>
  );
}
