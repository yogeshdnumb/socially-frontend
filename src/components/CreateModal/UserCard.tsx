import { Avatar, Button, Card, CardBody, Link } from "@nextui-org/react";

export function UserCard({
  btnMsg,
  profilePic,
  name,
  username,
  id,
  handlClick = () => {},
}) {
  return (
    <Card
      className="w-48 min-h-48 p-1 shadow border-1"
      as={Link}
      href={"/profile/" + id}
    >
      <CardBody className="flex flex-col gap-1 justify-center  items-center">
        <Avatar className="w-20 h-20" src={profilePic}></Avatar>
        <p className="text-xl">{name}</p>
        <p>{username}</p>
        <Button onClick={handlClick}>{btnMsg}</Button>
      </CardBody>
    </Card>
  );
}
