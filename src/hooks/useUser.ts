import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";

export function useUser() {
  return useContext(UserContext);
}
