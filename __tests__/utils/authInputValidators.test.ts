import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@utils/authInputValidators";

describe("Validation Functions", () => {
  describe("validateNickname", () => {
    it("should accept a valid nickname", () => {
      expect(() => validateNickname("JohnDoe")).not.toThrow();
      expect(() => validateNickname("홍길동")).not.toThrow();
    });

    it("should reject an invalid nickname", () => {
      expect(() => validateNickname("J")).toThrow("영문/한글/숫자 (2~10자)");
      expect(() => validateNickname("JohnDoe123456789")).toThrow(
        "영문/한글/숫자 (2~10자)"
      );
    });
  });

  describe("validateEmail", () => {
    it("should accept a valid email", () => {
      expect(() => validateEmail("example@example.com")).not.toThrow();
    });

    it("should reject an invalid email", () => {
      expect(() => validateEmail("example")).toThrow(
        "올바른 이메일을 입력해주세요"
      );
      expect(() => validateEmail("example@.com")).toThrow(
        "올바른 이메일을 입력해주세요"
      );
    });
  });

  describe("validatePassword", () => {
    it("should accept a valid password", () => {
      expect(() => validatePassword("Password1!")).not.toThrow();
    });

    it("should reject an invalid password", () => {
      expect(() => validatePassword("pass")).toThrow(
        "영문, 숫자, 특수문자 최소 1개 (8~16자)"
      );
      expect(() => validatePassword("password")).toThrow(
        "영문, 숫자, 특수문자 최소 1개 (8~16자)"
      );
    });
  });
});
