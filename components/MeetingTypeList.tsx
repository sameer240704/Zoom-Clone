"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Schedule a meeting"
          className="text-center"
          buttonText="Start the Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-1">
              Add a description
            </label>
            <Textarea
              className="bg-dark-2 border-none rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(event) => {
                setStartMeeting({
                  ...startMeeting,
                  description: event.target.value,
                });
              }}
            />

            <label className="text-base text-normal leading-[22px] text-sky-1 mt-2">
              Select date and time
            </label>
            <DatePicker
              selected={startMeeting.dateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded-xl bg-dark-3 p-2 focus:outline-none"
              onChange={(date) =>
                setStartMeeting({ ...startMeeting, dateTime: date! })
              }
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Scheduled"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
              description: "Use the copied link to join the meeting in future",
            });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start the Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Enter the meeting link"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(startMeeting.link)}
      >
        <Input
          className="bg-dark-3 rounded-[7px] border-none focus-within:outline-none placeholder:text-slate-400"
          placeholder="meeting@123"
          onChange={(event) =>
            setStartMeeting({ ...startMeeting, link: event.target.value })
          }
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
