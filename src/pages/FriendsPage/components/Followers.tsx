import { UserCard } from "@/components/CreateModal/UserCard";
import useFetch from "@/hooks/useFetch";
import { Spinner } from "@nextui-org/react";

export default function Followed({ id }: { id: number }) {
  const { data, error, isLoading } = useFetch(`/users/${id}/followers`);
  if (isLoading) {
    return <Spinner />;
  } else if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {data?.map((user, index) => {
        return (
          <UserCard
            btnMsg="Message"
            name={user.name}
            username={user.username}
            profilePic={user.profile_pic}
            key={index}
            id={user.id}
          ></UserCard>
        );
      })}
    </div>
  );
}
