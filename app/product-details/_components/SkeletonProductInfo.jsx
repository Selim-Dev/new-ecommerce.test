import React from "react";

function SkeletonProductInfo() {
  return (
    <div className="flex flex-col gap-6 rounded">
      <div className="w-[400px] h-[20px] rounded bg-slate-200 animate-pulse"></div>
      <div className="w-[70px] h-[20px] rounded bg-slate-200 animate-pulse"></div>
      <div className="w-[400px] h-[20px] rounded bg-slate-200 animate-pulse"></div>
      <div className="w-[400px] h-[20px] rounded bg-slate-200 animate-pulse"></div>
      <div className="w-[400px] h-[20px] rounded bg-slate-200 animate-pulse"></div>
      <div className="w-[100px] h-[20px] rounded bg-slate-200 animate-pulse"></div>
    </div>
  );
}

export default SkeletonProductInfo;
