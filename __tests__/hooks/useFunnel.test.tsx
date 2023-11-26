import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import useFunnel from "../../src/hooks/useFunnel";

describe("useFunnel hook", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should return a tuple containing a Funnel component (with a Step property) and changeStep function", () => {
    const { result } = renderHook(() => useFunnel(["step1"]));
    const [Funnel, changeStep] = result.current;

    expect(Funnel).toBeDefined(); // Funnel
    expect(Funnel.Step).toBeDefined(); // Funnel.Step
    expect(changeStep).toBeDefined(); // changeStep
  });

  it("should only accept Funnel.Step as children in the Funnel component", () => {
    const { result } = renderHook(() => useFunnel(["step1", "step2"]));
    const [Funnel] = result.current;

    const renderWithInvalidChild = () =>
      render(
        <React.Fragment>
          <Funnel>
            <div>I shouldn't be allowed</div>
            <Funnel.Step name="step1">Step 1 UI</Funnel.Step>
            <Funnel.Step name="step2">Step 2 UI</Funnel.Step>
          </Funnel>
        </React.Fragment>
      );

    expect(renderWithInvalidChild).toThrow(
      "div is not a <Funnel.Step> component. All component children of <Funnel> must be a <Funnel.Step>."
    );
  });

  it("should successfully render the first step in the funnel", () => {
    const { result } = renderHook(() => useFunnel(["step1", "step2"]));
    const [Funnel] = result.current;

    const { getByText, queryByText } = render(
      <React.Fragment>
        <div>
          <Funnel>
            <Funnel.Step name="step1">Step 1 UI</Funnel.Step>
            <Funnel.Step name="step2">Step 2 UI</Funnel.Step>
          </Funnel>
        </div>
      </React.Fragment>
    );

    expect(getByText("Step 1 UI")).toBeDefined();
    expect(queryByText("Step 2 UI")).toBeNull();
  });

  it("should successfully render the second step in the funnel", async () => {
    const { result } = renderHook(() => useFunnel(["step1", "step2"]));
    const [Funnel, changeStep] = result.current;

    const { getByText, queryByText } = render(
      <React.Fragment>
        <Funnel>
          <Funnel.Step name="step1">Step 1 UI</Funnel.Step>
          <Funnel.Step name="step2">Step 2 UI</Funnel.Step>
        </Funnel>
      </React.Fragment>
    );

    await act(async () => {
      changeStep("step2");
    });

    // eslint-disable-next-line no-console
    console.log(screen.debug(undefined, Infinity));

    waitFor(() => {
      expect(getByText("Step 2 UI")).toBeDefined();
      expect(queryByText("Step 1 UI")).toBeNull();
    });
  });
});
