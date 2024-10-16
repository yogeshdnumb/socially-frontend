//import classes from "./Home.module.scss";
import Post from "@/components/Post/Post";
import useFetch from "@/hooks/useFetch";

export default function HomePage() {
  const { data, error, isLoading } = useFetch("/posts?offset=0&limit=10");

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className=" flex flex-col items-center justity-center flex-1   gap-4">
      {data.map((postId, index: number) => (
        <Post key={index} id={postId} />
      ))}
      {/* {JSON.stringify(data)} */}
    </div>
  );
}
