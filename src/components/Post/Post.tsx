import Comments from "../Comments/Comments";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@/hooks/useUser";
import { PostType } from "@/types";
import { api } from "@/utils/api";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";

export default function Post({ id }: { id: number }) {
  const { data, setData, error, isLoading } = useFetch("/posts/" + id);

  const { user } = useUser();
  const { isOpen: isCommentsOpened, onOpenChange: onCommentsChange } =
    useDisclosure();
  const [isExpanded, setIsExpanded] = useState(false);

  const isPostLikedByUser = data?.likes.includes(user?.id);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Card className="max-w-96 border-6">
      <CardHeader className="flex flex-col ">
        <div className="flex gap-2 items-center w-full  pl-2 justify-between">
          <div className="flex gap-2 items-center">
            <Avatar src={data?.profile_pic}></Avatar>
            <p>{data?.name}</p>
          </div>
          <p>{DateTime.fromISO(data.created_at).toRelativeCalendar()}</p>
        </div>
      </CardHeader>
      <Divider />

      <CardBody>
        <Image
          src={data?.media_url}
          classNames={{
            wrapper: "h-[400px] m-auto",
            img: "h-full w-full object-contain",
          }}
        ></Image>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col  gap-2">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <Tooltip showArrow={true} content="like">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  onClick={async () => {
                    // toast.warn(`${user.id} ${data.id}`);
                    try {
                      if (!isPostLikedByUser) {
                        await api.post(`/posts/${data?.id}/likes/${user.id}`);
                        setData({
                          ...(data as PostType),
                          likes: [...data.likes, user.id],
                        });
                      } else {
                        await api.delete(`/posts/${data?.id}/likes/${user.id}`);
                        setData({
                          ...(data as PostType),
                          likes: data?.likes.filter((id) => id !== user.id),
                        });
                      }
                    } catch (error) {
                      console.log("ERROR=>", error);
                    }
                  }}
                >
                  <FiHeart
                    color={isPostLikedByUser ? "red" : ""}
                    // className={isPostLikedByUser ? "bg-red-500" : ""}
                    size={"55%"}
                  />
                </Button>
              </Tooltip>
              <span>{data?.likes.length}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Tooltip content="comment" showArrow={true}>
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  onClick={onCommentsChange}
                >
                  <FiMessageCircle size={"55%"} />
                </Button>
              </Tooltip>
              <span>23k</span>
            </div>
            <div className="flex gap-2 items-center">
              <Tooltip content="share" showArrow={true}>
                <Button isIconOnly variant="bordered" size="sm">
                  <FiSend size={"55%"} />
                </Button>
              </Tooltip>
            </div>
          </div>
          <div onClick={() => setIsExpanded(!isExpanded)}>
            <p className="font-semibold">{data?.title}</p>
            <p className="font-normal">
              {isExpanded ? data?.description : "see description"}
            </p>
          </div>
          <Comments
            postId={data?.id}
            isCommentsOpened={isCommentsOpened}
            onCommentsChange={onCommentsChange}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
