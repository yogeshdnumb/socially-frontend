import { UserCard } from "@/components/CreateModal/UserCard";
import useFetch from "@/hooks/useFetch";
import { Spinner } from "@nextui-org/react";

export default function Following({ id }: { id: number }) {
  const { data, error, isLoading } = useFetch(`/users/${id}/following`);
  if (isLoading) {
    return <Spinner className="mx-auto" />;
  } else if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {data?.map((user, index) => (
        <UserCard
          btnMsg="Message"
          name={user.name}
          username={user.username}
          profilePic={user.profile_pic}
          id={user.id}
          key={index}
        ></UserCard>
      ))}
    </div>
  );
}
