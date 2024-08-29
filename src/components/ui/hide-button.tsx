import Image from "next/image";
import { ComponentProps, ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  hide: boolean;
}

export const HideButton = ({ className, hide, ...props }: Props) => {
  const image = hide ? "hide" : "show";
  const alt = hide ? "hide" : "show";

  return (
    <button
      {...props}
      className={twMerge(
        "absolute -right-5 top-0 z-20 size-[16px] rounded-full",
        className,
      )}
    >
      <Image
        src={`./svgs/${image}.svg`}
        alt={alt}
        width={100}
        height={100}
        className={"size-[16px]"}
      />
    </button>
  );
};
