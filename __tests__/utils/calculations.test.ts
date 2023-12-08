import {
  calculateLossRate,
  calculateRate,
  calculateValue,
} from "@utils/calculations";

describe("주가 관련 함수 테스트", () => {
  describe("calculateRate 함수", () => {
    it("첫 번째 인자가 두 번째 인자보다 클 때 증가율을 계산한다", () => {
      expect(calculateRate(200, 100)).toBe(100);
    });

    it("첫 번째 인자가 두 번째 인자보다 작을 때 감소율을 계산한다", () => {
      expect(calculateRate(100, 200)).toBe(-50);
    });
  });

  describe("손실률 계산 함수 테스트", () => {
    describe("calculateLossRate 함수", () => {
      it("첫 번째 인자가 두 번째 인자보다 클 때 손실률을 계산한다", () => {
        expect(calculateLossRate(200, 100)).toBe("50");
      });

      it("첫 번째 인자가 두 번째 인자보다 작을 때 손실률을 계산한다", () => {
        // 예: 100에서 200으로 증가했을 때, 손실률은 -100%이다.
        expect(calculateLossRate(100, 200)).toBe("-100");
      });

      it("첫 번째 인자와 두 번째 인자가 같을 때 손실률을 계산한다", () => {
        expect(calculateLossRate(100, 100)).toBe("0");
      });
    });
  });

  describe("값 계산 함수 테스트", () => {
    describe("calculateValue 함수", () => {
      it("양수 비율을 적용하여 값을 계산한다", () => {
        expect(calculateValue(50, 100)).toBe("150");
      });

      it("음수 비율을 적용하여 값을 계산한다", () => {
        expect(calculateValue(-50, 100)).toBe("50");
      });

      it("비율이 0일 때 값을 계산한다", () => {
        expect(calculateValue(0, 100)).toBe("100");
      });
    });
  });
});
