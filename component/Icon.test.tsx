// Generated by util/create-component.ts v.0.0.1
// on Tue Sep 05 2023 11:22:11 GMT-0400 (Eastern Daylight Time).
import React from "react";
import { render } from "@testing-library/react";

import Icon from "./Icon";
import { IconProps } from "../types/Icon.types";

describe("Icon", () => {
  let props: IconProps;

  const renderComponent = () => render(<Icon {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Icon");

    expect(component).toBeInstanceOf(HTMLElement);
  });
});