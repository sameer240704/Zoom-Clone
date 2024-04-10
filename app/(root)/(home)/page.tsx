import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  const dateNew = new Date();
  const time = dateNew.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = dateNew.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <section className="size-full flex flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-2xl bg-hero bg-cover">
        <div className="h-full flex flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold max-sm:text-5xl lg:text-7xl">
              {time}
            </h1>
            <p className="text-lg font-medium text-sky-1 max-sm:text-xl lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
