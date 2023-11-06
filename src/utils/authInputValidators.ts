export function validateNickname(nickname: string) {
  const nicknameRegex = new RegExp(
    /^(?=.*[a-zA-Z가-힣])[a-zA-Z가-힣0-9]{2,10}$/
  );
  if (!nicknameRegex.test(nickname)) {
    throw Error("영문/한글/숫자 (2~10자)");
  }
}

export function validateEmail(email: string) {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!emailRegex.test(email)) {
    throw Error("올바른 이메일을 입력해주세요");
  }
}

export function validatePassword(password: string) {
  const passwordRegex = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/
  );
  if (!passwordRegex.test(password)) {
    throw Error("영문, 숫자, 특수문자 최소 1개 (8~16자)");
  }
}
