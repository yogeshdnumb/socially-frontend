import Comment from "../Comment/Comment";
import { useUser } from "@/hooks/useUser";
import { CommentType } from "@/types";
import { api } from "@/utils/api";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Spinner,
  Textarea,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Comments({
  isCommentsOpened,
  onCommentsChange,
  postId,
}: {
  isCommentsOpened: boolean;
  onCommentsChange: () => void;
  postId: number;
}) {
  const [data, setData] = useState<CommentType[]>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [commentValue, setCommentValue] = useState("");

  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await api.get(`/posts/${postId}/comments`)).data;
        setData(data);
        console.log(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e);
          console.log(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [postId]);
  if (isLoading) {
    return <Spinner className="m-auto" label="Loading"></Spinner>;
  } else if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Modal
      onOpenChange={onCommentsChange}
      isOpen={isCommentsOpened}
      scrollBehavior="inside"
      className=""
    >
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            <Textarea
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              variant="bordered"
              className="mx-auto"
              label="Add comment"
            />
            <Button
              className="min-h-8 "
              onClick={async () => {
                try {
                  if (!commentValue) return;
                  const postResponse = await api.post(
                    `/posts/${postId}/comments`,
                    {
                      post_id: postId,
                      content: commentValue,
                      user_id: user.id,
                    },
                  );

                  const getResponse = await api.get(
                    `/posts/${postId}/comments`,
                  );

                  setData(getResponse.data);
                  setCommentValue("");
                } catch (error) {
                  setError(error);
                  console.log("ERROR=>", error);
                }
              }}
            >
              Comment
            </Button>
          </div>
          <div className="min-h-full flex flex-col gap-4">
            {data?.map((comment: CommentType) => (
              <Comment key={comment.id} data={comment} />
            ))}
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
