import { CommentType } from "@/types";
import { Avatar } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useState } from "react";

export default function Comment({ data }: { data: CommentType }) {
  const [isShorten, setIsShorten] = useState(true);

  return (
    <div className="p-4 border-1 shadow flex flex-col h-40 gap-2 ">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center ">
          <Avatar src={data.profile_pic} className="w-8 h-8 shrink-0"></Avatar>
          <p>{data.name}</p>
        </div>
        <p className="text-opacity-5">
          {DateTime.fromISO(data.created_at).toRelativeCalendar()}
        </p>
      </div>
      <p className="overflow-auto">{data.content}</p>
    </div>
  );
}
