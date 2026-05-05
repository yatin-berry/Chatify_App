function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className={`flex items-end gap-3 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
        >
          {/* Avatar Skeleton */}
          <div className="size-10 rounded-xl bg-white/5 animate-pulse shrink-0" />
          
          <div className={`space-y-2 max-w-[60%]`}>
            <div 
              className={`h-12 rounded-[20px] bg-white/5 animate-pulse
                ${index % 2 === 0 ? "rounded-tl-none w-48" : "rounded-tr-none w-64"}
              `} 
            />
            <div className={`h-3 w-12 bg-white/5 animate-pulse rounded-full ${index % 2 === 0 ? "" : "ml-auto"}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;
