import { UserCard } from "@/components/CreateModal/UserCard";
import useFetch from "@/hooks/useFetch";
import { api } from "@/utils/api";
import { useNavigate } from "react-router";

export default function Pending({ id }: { id: number }) {
  const { data, error, isLoading } = useFetch(`/users/${id}/pending`);
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {data?.map((user, index) => (
        <div
          key={index}
          onClick={() => {
            navigate(`/profile/${user.id}`);
          }}
        >
          <UserCard
            btnMsg="Visit"
            name={user.name}
            username={user.username}
            profilePic={user.profile_pic}
            id={user.id}
          ></UserCard>
        </div>
      ))}
    </div>
  );
}
