"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

const EndCallButton = () => {
  const call = useCall();
  const localParticipant = useCallStateHooks().useLocalParticipant();
  const router = useRouter();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCallForEveryone = async () => {
    try {
      await call.endCall();
      toast({
        title: "Your meeting has been ended",
      });
      router.push("/");
    } catch (error) {
      console.log(`End call for everyone Error: ${error}`);
      toast({
        title: "Cannot end the meeting for everyone",
      });
    }
  };

  return (
    <Button
      className="bg-red-500 hover:bg-red-600 rounded-xl"
      onClick={endCallForEveryone}
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
