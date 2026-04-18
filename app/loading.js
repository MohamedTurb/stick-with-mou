export default function Loading() {
  return (
    <div className="bg-nox-black min-h-screen pt-16 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-nox-accent border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-[10px] tracking-[0.4em] text-nox-gray uppercase">Loading</p>
      </div>
    </div>
  );
}
