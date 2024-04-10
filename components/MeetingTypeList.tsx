"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isScheduledMeeting" | "isInstantMeeting" | undefined
  >();

  const createMeeting = () => {};

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
