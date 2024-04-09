"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 bg-dark-1 text-white flex- flex-col h-screen justify-between p-6 pt-28 max-sm:hidden lg:w-1/5">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                `flex gap-4 items-center justify-start p-4 rounded-lg hover:bg-slate-900`,
                {
                  "hover:bg-slate-900": !isActive,
                  "bg-green-600 hover:bg-green-600": isActive,
                }
              )}
            >
              <Image
                src={item.imageUrl}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
