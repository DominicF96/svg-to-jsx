import { SVGProps } from "react";
import Color from "./Colors.type";

export const iconCategories = {
  brand: "brand",
  menu: "menu",
  ui: "ui",
};
export type IconCategory = keyof typeof iconCategories;

export type CategorizedIcon = {
  category: IconCategory;
  component: React.FC<IconSvgProps>;
};

export type IconMap = Record<string, CategorizedIcon>;

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

export type IconProps = IconSvgProps & {
  icon: keyof IconMap;
  color?: Color;
};
