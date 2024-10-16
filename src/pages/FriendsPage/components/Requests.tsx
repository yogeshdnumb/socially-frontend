import { UserCard } from "@/components/CreateModal/UserCard";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/api";

export default function Requests({ id }: { id: number }) {
  const { data, setData, error, isLoading } = useFetch(`/users/${id}/requests`);

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {data?.map((user, index) => (
        <UserCard
          handlClick={async () => {
            try {
              console.log(id, user.id);

              await api.put(`/users/${id}/followers`, {
                followed: id,
                followed_by: user.id,
              });
              const response = await api.get(`/users/${id}/requests/`);
              setData(response.data);
            } catch (error) {
              console.log(error);
            }
          }}
          btnMsg="Accept"
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
