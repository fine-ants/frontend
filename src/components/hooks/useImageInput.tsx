import { ChangeEvent, useState } from "react";

type Props = {
  sizeLimit: number; // bytes
};

export default function useImageInput({ sizeLimit }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    if (files.length > 1) {
      // 여러 파일이 선택된 경우 에러 메시지 설정
      setError("하나의 이미지 파일만 업로드 가능합니다");
      setImageFile(null);
      setImageUrl("");
      return;
    }

    const newImageFile = files[0];

    if (newImageFile.size > sizeLimit) {
      setError(`이미지 사이즈 ${Math.floor(sizeLimit / 1000000)}MB 이하`);
      setImageFile(null);
      setImageUrl("");
      return;
    }

    if (!newImageFile.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다");
      setImageFile(null);
      setImageUrl("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(newImageFile);

    setImageFile(newImageFile);
    setError("");
  };

  return { imageUrl, imageFile, error, onChange };
}
