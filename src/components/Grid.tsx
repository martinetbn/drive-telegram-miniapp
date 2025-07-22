export default function Grid() {
  return (
    <div className="fixed h-screen w-screen">
      <div className="h-screen w-1 bg-white/20 absolute left-1/4" />
      <div className="h-screen w-1 bg-white/20 absolute left-1/2" />
      <div className="h-screen w-1 bg-white/20 absolute left-3/4" />
    </div>
  );
}