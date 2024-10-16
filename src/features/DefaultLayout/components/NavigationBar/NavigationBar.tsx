import NavigationBarMenu from "../NavigationBarMenu/NavigationBarMenu";
import CreateModal from "@/components/CreateModal/CreateModal";
import { useUser } from "@/hooks/useUser";
import { api } from "@/utils/api";
import {
  Avatar,
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { FiInstagram } from "react-icons/fi";
import { useNavigate } from "react-router";

export default function NavigationBar() {
  const {
    isOpen: isCreateModalOpened,
    onOpen: onCreateModalOpen,
    onOpenChange: onCreateModalChange,
  } = useDisclosure();
  const { user } = useUser();
  console.log(user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="sticky"
      // shouldHideOnScroll
      className="shadow sm:rounded-2xl sm:my-4 sm:top-4 border-1 "
    >
      <CreateModal
        isCreateModalOpened={isCreateModalOpened}
        onCreateModalChange={onCreateModalChange}
      ></CreateModal>

      <NavbarMenuToggle />
      <NavbarMenu>
        <NavigationBarMenu setIsMenuOpen={setIsMenuOpen} />
      </NavbarMenu>
      <NavbarBrand>
        <Button isIconOnly variant="light">
          <FiInstagram size={24} />
        </Button>
        <p className="font-bold text-lg text-primary-600">Socialy</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/register">
            Register
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            onClick={async () => {
              await api.get("/auth/logout");
              console.log("logging out");

              navigate("/login");
            }}
          >
            Logout
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/profile/" + user.id}>
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/friends">
            Friends
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button onClick={onCreateModalOpen} color="primary" variant="flat">
            <span className="font-bold text-lg">Create</span>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarItem>
        <Avatar
          as={Link}
          href={"/profile/" + user?.id}
          src={user?.profile_pic}
        ></Avatar>
      </NavbarItem>
    </Navbar>
  );
}
