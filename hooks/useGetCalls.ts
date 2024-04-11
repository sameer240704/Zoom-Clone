import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { start } from "repl";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  const date = new Date();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      setIsLoading(true);

      try {
        const loadCalls = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.log(`useGetCalls Hook Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [user?.id, client]);

  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < date) || !!endedAt;
  });

  const upcomingCalls = calls.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return startsAt && new Date(startsAt) > date;
    }
  );

  return { endedCalls, upcomingCalls, recordings: calls, isLoading };
};
