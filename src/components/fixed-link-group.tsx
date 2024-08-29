"use client";

import Link from "next/link";

export const FixedLinkGroup = () => {
  const handleOnReset = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div className={"fixed right-8 top-4 sm:top-8"}>
      <div className={"flex flex-col items-end gap-2"}>
        <Link
          href={"https://github.com/okanay/filter-filter-v2"}
          target={"_blank"}
          className="w-fit rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 shadow shadow-zinc-950/10"
        >
          <span className="bg-gradient-to-br from-orange-600 to-amber-500 bg-clip-text font-mono text-sm font-bold tracking-wider text-transparent">
            Source Code
          </span>
        </Link>
        <Link
          href={"https://okanay.com/"}
          target={"_blank"}
          className="w-fit rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 shadow shadow-zinc-950/10"
        >
          <span className="bg-gradient-to-br from-sky-400 to-purple-400 bg-clip-text font-mono text-sm font-bold tracking-wider text-transparent">
            Contact
          </span>
        </Link>
        <button
          onClick={handleOnReset}
          className="w-fit rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 shadow shadow-zinc-950/10"
        >
          <span className="bg-gradient-to-br from-red-400 to-rose-400 bg-clip-text font-mono text-sm font-bold tracking-wider text-transparent">
            Reset
          </span>
        </button>
      </div>
    </div>
  );
};
