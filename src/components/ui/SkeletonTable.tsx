interface SkeletonTableProps {
  rows?: number;
  cols?: number;
}

export default function SkeletonTable({ rows = 5, cols = 5 }: SkeletonTableProps) {
  return (
    <div className="w-full animate-pulse">
      {/* Header */}
      <div className="flex gap-4 px-4 py-3 border-b border-brand-border">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-3 bg-brand-alt-bg rounded flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-4 py-3 border-b border-brand-border">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-4 bg-brand-alt-bg rounded flex-1"
              style={{ opacity: 1 - c * 0.1 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
