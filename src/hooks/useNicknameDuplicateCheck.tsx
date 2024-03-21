import { postNicknameDuplicateCheck } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import { UserContext } from "@context/UserContext";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";

type Props = {
  newNickname: string;
  newNicknameIsError: boolean;
};

export default function useNicknameDuplicateCheck({
  newNickname,
  newNicknameIsError,
}: Props) {
  const { user } = useContext(UserContext);

  const [duplicateCheckErrorMsg, setDuplicateCheckErrorMsg] = useState("");
  const [isDuplicateComplete, setIsDuplicateComplete] = useState(false);

  const updateDuplicateCheckErrorMsg = (msg: string) => {
    setDuplicateCheckErrorMsg(msg);
  };

  const updateIsDuplicateComplete = (isComplete: boolean) => {
    setIsDuplicateComplete(isComplete);
  };

  const isDuplicateChecked = !duplicateCheckErrorMsg && isDuplicateComplete;

  useEffect(() => {
    if (
      newNickname === "" ||
      newNickname.length < 2 ||
      newNickname.length > 10 ||
      newNickname === user?.nickname ||
      newNicknameIsError
    )
      return;

    (async () => {
      try {
        const res = await postNicknameDuplicateCheck(newNickname);
        setIsDuplicateComplete(true);

        if (res.code === HTTPSTATUS.success) {
          setDuplicateCheckErrorMsg("");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setDuplicateCheckErrorMsg(error.response?.data.message);
        }
      }
    })();
  }, [newNickname, newNicknameIsError, user?.nickname]);

  return {
    isDuplicateChecked,
    duplicateCheckErrorMsg,
    updateDuplicateCheckErrorMsg,
    updateIsDuplicateComplete,
  };
}
