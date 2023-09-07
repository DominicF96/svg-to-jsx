// Generated by util/create-component.ts v.0.0.1
// on Tue Sep 05 2023 11:22:11 GMT-0400 (Eastern Daylight Time).
import React from "react";
import Icon from "./Icon";
import Color from "../types/Colors.type";
import { iconCategories } from "../types/Icon.types";
import icons from "./Icon.map";

export default {
  title: "Data Display/Icon",
};

export const IconComponent = (args) => (
  <Icon
    icon={args.icon}
    color={args.color}
    size={args.size}
    strokeWidth={args.strokeWidth}
  />
);
IconComponent.args = {
  icon: Object.keys(icons)[0] as keyof typeof icons,
  color: Object.keys(Color)[0] as keyof typeof Color,
  size: 64,
  strokeWidth: 1,
};
IconComponent.argTypes = {
  icon: {
    control: {
      type: "select",
    },
    options: Object.keys(icons) as Array<keyof typeof icons>,
  },
  color: {
    control: {
      type: "select",
    },
    options: Object.keys(Color) as Array<keyof typeof Color>,
  },
  size: {
    control: {
      type: "number",
    },
  },
  strokeWidth: {
    control: {
      type: "number",
    },
  },
};

export const Directory = (args) => (
  <>
    {Object.keys(iconCategories).map((category) => {
      return (
        <>
          <h6>{category}</h6>
          {Object.keys(icons)
            .filter((icon) => icons[icon].category === category)
            .map((icon) => {
              return (
                <Icon icon={icon} size={48} style={{ marginRight: "32px" }} />
              );
            })}
        </>
      );
    })}
  </>
);
