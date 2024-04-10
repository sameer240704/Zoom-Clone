"use client";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  return (
    <main className="h-screen w-full">
      <StreamCall>
        <StreamTheme>
          {isSetupCompleted ? <MeetingRoom /> : <MeetingSetup />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
