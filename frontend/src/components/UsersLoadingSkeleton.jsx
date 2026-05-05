function UsersLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="p-4 rounded-2xl bg-white/5 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-white/10 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded-full w-2/3"></div>
              <div className="h-3 bg-white/5 rounded-full w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;
