//import classes from "./FriendsPage.module.scss";
import Followers from "./components/Followers";
import Following from "./components/Following";
import Pending from "./components/Pending";
import Requests from "./components/Requests";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@/hooks/useUser";
import { Avatar, Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";

export default function FriendsPage() {
  const { user } = useUser();
  return (
    <div className="flex-1 grid place-content-center">
      <Tabs className="mx-auto">
        <Tab key={"followers"} title="Followers">
          <Followers id={user.id} />
        </Tab>
        <Tab key={"following"} title="Following" className="">
          <Following id={user.id} />
        </Tab>
        <Tab key={"requests"} title="Requests" className="">
          <Requests id={user.id} />
        </Tab>
        <Tab key={"pending"} title="Pending" className="">
          <Pending id={user.id} />
        </Tab>
      </Tabs>
    </div>
  );
}
