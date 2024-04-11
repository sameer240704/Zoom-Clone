"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface TableProps {
  title: string;
  description: string;
}

const Table = ({ title, description }: TableProps) => (
  <div className="flex items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
      {title}:
    </h1>
    <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
      {description}
    </h1>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingID = user?.id;
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const router = useRouter();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`;
  const { currentCall } = useGetCallById(meetingID!);

  const startRoom = async () => {
    if (!user || !client) return;

    const newCall = client.call("default", meetingID!);

    if (!currentCall) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    toast({
      title: "Personal Meeting Created",
      description: `Welcome ${user?.username} to Personal Room`,
    });

    router.push(`/meeting/${meetingID}?personal=true`);
  };

  return (
    <section className="size-full flex flex-col gap-10 text-white">
      <h1 className="text-3xl font-extrabold">Personal Room</h1>
      <div className="w-full flex flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Topic"
          description={`${user?.username}'s Personal Meeting Room`}
        />
        <Table title="Meeting ID" description={`${meetingID!}`} />
        <Table title="Security" description={`✅ Waiting Room`} />
        <Table title="Join URL" description={`${meetingLink}`} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1 rounded-[7px]" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
              description: "Use the copied link to join the meeting in future",
            });
          }}
          className="bg-dark-4 gap-2 px-6 rounded-[7px]"
        >
          <Image src="/icons/copy.svg" alt="copy" width={20} height={20} />
          Copy the invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
