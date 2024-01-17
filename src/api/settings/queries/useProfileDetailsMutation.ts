import { UserContext } from "@context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { putProfileDetails } from "..";
import { settingsKeys } from "./queryKeys";

export default function useProfileDetailsMutation() {
  const { onEditProfileDetails } = useContext(UserContext);

  return useMutation({
    mutationKey: settingsKeys.profileEdit().queryKey,
    mutationFn: putProfileDetails,
    onSuccess: (res) => {
      onEditProfileDetails(res.data);
    },
    onError: (error) => {
      // TODO: Handle error
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
}
