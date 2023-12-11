import { debounce } from "@mui/material";
import { useEffect, useState } from "react";

export default function useInputDebounce(newValue: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(newValue);

  const debouncedSetValue = debounce((newValue: string) => {
    setDebouncedValue(newValue);
  }, delay);

  useEffect(() => {
    // 입력값이 변경될 때마다 디바운스 함수 호출
    debouncedSetValue(newValue);

    // 컴포넌트 언마운트 시 디바운스 함수 취소
    return () => {
      debouncedSetValue.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newValue]);

  return debouncedValue;
}
