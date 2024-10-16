//import classes from "./Profile.module.scss";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@/hooks/useUser";
import { UserType } from "@/types";
import { api } from "@/utils/api";
import { Avatar, Button, Card, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useUser();

  const { data, error, isLoading } = useFetch(`/users/${userId}`);

  return (
    <div className="mx-auto">
      <Card className="sm:p-3 p-2">
        <div className="flex flex-col items-center sm:gap-4 gap-1">
          <div className="flex items-center">
            <Avatar
              src={data?.profile_pic}
              className="min-w-24 min-h-24"
            ></Avatar>
          </div>
          <div className="flex flex-col  gap-1 items-center">
            <p className="text-2xl font-medium">{data?.name}</p>
            {userId != user.id && (
              <Button
                className="bg-primary-300"
                onClick={async () => {
                  await api.post(`/users/${userId}/followers`, {
                    followed_by: user.id,
                    followed: userId,
                  });
                }}
              >
                <span className="text-xl">Follow</span>
              </Button>
            )}
            <div className="flex gap-4">
              <p>{data?.followers} Followers</p>
              <p>{data?.following} Following</p>
            </div>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              ipsa!
            </p> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
