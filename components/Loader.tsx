import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex-center">
      <Image src="/icons/loading.svg" alt="Loading" width={60} height={60} />
    </div>
  );
};

export default Loader;
