"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { link } from "fs";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-screen min-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger"
            height={36}
            width={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="Virtual Vibe Logo"
              width={48}
              height={48}
            />
            <p className="text-[28px] font-extrabold text-white">
              Virtual Vibe
            </p>
          </Link>
          <div className="flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]">
            <SheetClose asChild>
              <section className="flex flex-col h-full gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          `flex gap-4 items-center w-full p-4 rounded-lg hover:bg-slate-900`,
                          {
                            "hover:bg-slate-900": !isActive,
                            "bg-green-600 hover:bg-green-600": isActive,
                          }
                        )}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
