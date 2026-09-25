export function ProductCardSkeleton() {
  return (
    <div className="bg-dbs-card border border-dbs-border rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-dbs-dark" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-dbs-border rounded" />
        <div className="h-4 w-full bg-dbs-border rounded" />
        <div className="h-4 w-2/3 bg-dbs-border rounded" />
        <div className="h-3 w-24 bg-dbs-border rounded" />
        <div className="h-6 w-28 bg-dbs-border rounded" />
        <div className="h-10 w-full bg-dbs-border rounded-xl" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
