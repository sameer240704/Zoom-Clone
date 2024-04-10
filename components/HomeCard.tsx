"use client";
import React from "react";

interface HomeCardProps {
  imageUrl: string;
  title: string;
  description: string;
  handleClick: () => void;
  className: string;
}

import Image from "next/image";
import { cn } from "@/lib/utils";
const HomeCard = ({
  imageUrl,
  title,
  description,
  handleClick,
  className,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-between px-4 py-6 xl:max-w-[270px] min-h-[260px] rounded-xl cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={imageUrl} alt={title} height={27} width={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-medium">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
