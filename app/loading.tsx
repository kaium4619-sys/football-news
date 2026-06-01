export default function Loading() {
  return (
    <div className="container py-8 space-y-8 animate-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-8 bg-muted rounded-full" />
        <div className="h-8 w-48 bg-muted rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-3xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
