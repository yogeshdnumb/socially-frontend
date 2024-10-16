import { useUser } from "@/hooks/useUser";
import { api } from "@/utils/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CreateModal({
  isCreateModalOpened,
  onCreateModalChange,
}: {
  isCreateModalOpened: boolean;
  onCreateModalChange: () => void;
}) {
  const [previewImg, setPreviewImg] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();

  return (
    <Modal
      scrollBehavior="inside"
      onOpenChange={onCreateModalChange}
      isOpen={isCreateModalOpened}
      onClose={() => {
        setPreviewImg(null);
        setTitle("");
        setDescription("");
      }}
      // placement=""
    >
      <ModalContent>
        <>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <div className="">
              <Tabs>
                <Tab key={"media"} title="Media">
                  <div className="flex flex-col items-center justify-center  min-h-80">
                    <input
                      type="file"
                      className="hidden"
                      id="media-input"
                      onChange={(e) => {
                        console.log(e.currentTarget.files);

                        if (
                          e.currentTarget.files &&
                          e.currentTarget.files?.length >= 1
                        ) {
                          console.log("setting");

                          setPreviewImg(e.currentTarget.files[0]);
                        }
                      }}
                    />
                    {previewImg != null ? (
                      <div>
                        <img
                          onLoad={() => {
                            URL.revokeObjectURL(
                              URL.createObjectURL(previewImg),
                            );
                          }}
                          src={URL.createObjectURL(previewImg)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <Button>Next</Button>
                      </div>
                    ) : (
                      <label htmlFor="media-input" onClick={() => {}}>
                        <div className="text-xl border-1  flex items-center gap-2  shadow-md p-4 rounded-xl">
                          <p>Add Image</p>
                          <FiPlusCircle />
                        </div>
                      </label>
                    )}
                  </div>
                </Tab>
                <Tab key={"info"} title="Info">
                  <div className="min-h-80 flex flex-col justify-center items-center">
                    <Textarea
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      label="Title"
                      placeholder="Enter your title"
                      variant="faded"
                      description="32/100"
                      maxLength={66}
                      maxRows={2}
                    ></Textarea>
                    <Textarea
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      label="Description"
                      placeholder="Enter your description"
                      variant="faded"
                      description="78/500"
                      maxLength={300}
                    ></Textarea>
                    <Button variant="flat" color="primary" className="">
                      <span
                        className="font-bold text-xl"
                        onClick={async () => {
                          const formData = new FormData();
                          if (
                            title.length == 0 ||
                            description.length == 0 ||
                            !previewImg
                          ) {
                            console.log(title.length, description.length);

                            toast.warn("Please fill all fields");
                            return;
                          }
                          // if (previewImg != null)
                          formData.append("media", previewImg);
                          formData.append("title", title);
                          formData.append("description", description);
                          formData.append("user_id", user.id);
                          console.log(formData);
                          console.log(
                            "inside",
                            title.length,
                            description.length,
                          );
                          await api.post("/posts", formData);
                        }}
                      >
                        Post
                      </span>
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
