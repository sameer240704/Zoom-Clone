"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isScheduledMeeting" | "isInstantMeeting" | undefined
  >();

  const [startMeeting, setStartMeeting] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const { toast } = useToast();

  const createMeeting = async () => {
    if (!user || !client) return;
    try {
      const callType = "default";
      const callId = crypto.randomUUID();
      const call = client.call(callType, callId);

      if (!call) throw new Error("Call creation error");

      const meetingStartsAt =
        startMeeting.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
      const description =
        startMeeting.description || "Meeting has been created";

      await call.getOrCreate({
        data: {
          starts_at: meetingStartsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!startMeeting.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created successfully",
        description: `Your meeting was created at: ${new Date(Date.now())}`,
      });
    } catch (error) {
      console.log(`Create Meeting Error: ${error}`);
      toast({
        title: "Meeting creation failed",
        description: "Stream services are not connected",
      });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        imageUrl="/icons/add-meeting.svg"
        title="New Meeting"
        description="Create an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        imageUrl="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        imageUrl="/icons/schedule.svg"
        title="Scheduled Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduledMeeting")}
        className="bg-purple-1"
      />
      <HomeCard
        imageUrl="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-yellow-1"
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start the Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
