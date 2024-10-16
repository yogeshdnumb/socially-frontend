import { useUser } from "@/hooks/useUser";
import { Button, Link } from "@nextui-org/react";
import { FiHome, FiUser } from "react-icons/fi";

export default function SideBar() {
  const { user } = useUser();
  return (
    <div className="min-w-48 hidden sm:block">
      <div className="flex flex-col gap-1 p-2 w-48  fixed  border shadow">
        {[
          { label: "Home", link: "/", Icon: FiHome },
          { label: "Profile", link: "/profile/" + user.id, Icon: FiUser },
          { label: "Friends", link: "/friends", Icon: FiUser },
          // { label: "Requests", link: "requests", Icon: FiUser },
        ].map((item, index) => (
          <Button
            color="primary"
            variant="light"
            as={Link}
            href={item.link}
            key={index}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
