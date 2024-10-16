//import classes from "./LoginPage.module.scss";
import { Button, Link } from "@nextui-org/react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

export default function LoginPage() {
  return (
    <div className="gap-6  shadow  p-4 mx-auto flex flex-col items-center">
      <div className="flex items-center gap-1 text-secondary-800 font-bold sm:font-semibold text-2xl sm:text-4xl">
        <span> Welcome to Socialy</span>
        <FiInstagram />
      </div>
      <Button
        variant="bordered"
        color="primary"
        href="http://localhost:3000/auth/google"
        as={Link}
        // className="rounded-none"
      >
        <FaGoogle size={"50%"} />
        <span className="font-bold text-lg sm:text-2xl sm:font-semibold ">
          Continue with Google
        </span>
      </Button>
      <Button
        variant="bordered"
        color="primary"
        href="http://localhost:3000/auth/google"
        as={Link}
        // className="rounded-none"
      >
        <FaGithub size={"50%"} />
        <span className="font-bold text-lg sm:text-2xl sm:font-semibold  ">
          Continue with Github
        </span>
      </Button>
    </div>
  );
}
