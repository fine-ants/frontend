import { useQuery } from "@tanstack/react-query";
import { getUser } from "..";
import { userKeys } from "./queryKeys";

export default function useUserQuery() {
  return useQuery({
    queryKey: userKeys.details().queryKey,
    queryFn: getUser,
    retry: false,
    // enabled: false, // disable automatically fetching
    // when enabled is true, everything works fine until the user logs out (leads to infinite loop of requests)
    // when enabled is false, the user data is not fetched after the user logs in or even if the user is already logged in (tokens are stored in localStorage)
    enabled: localStorage.getItem("accessToken") ? true : false,
    select: (res) => res.data.user,
  });
}
