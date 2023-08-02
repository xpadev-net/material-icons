import React from "react";

import { IconProps } from "@/@types/IconProps";

export const BaseSvg = ({
  children,
  className,
  color,
  style,
  ...props
}: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 -960 960 960"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ fill: color, ...(style ?? {}) }}
      {...props}
    >
      {children}
    </svg>
  );
};