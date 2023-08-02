import { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  color?: string;
  children: ReactNode;
};
