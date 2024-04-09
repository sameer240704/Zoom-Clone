import React from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  return <div className="text-3xl p-2">Meeting Room: #{params.id}</div>;
};

export default Meeting;
