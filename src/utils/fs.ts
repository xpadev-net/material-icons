import * as fs from "fs";
import * as path from "path";

export const saveIconFile = (
  indexName: string,
  baseDir: string,
  slug: string,
  name: string,
  svg: string
) => {
  fs.writeFileSync(
    path.join(baseDir, `${slug}.tsx`),
    `import React from "react";

import { IconProps } from "@/@types/IconProps";

export const ${name}Icon = ({
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
      viewBox="0 0 24 24"
      enableBackground="new 0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ fill: color, ...(style ?? {}) }}
      {...props}
    >
      ${svg}
    </svg>
  );
};
`
  );
  const indexFile = path.join(baseDir, indexName);
  if (!fs.existsSync(indexFile)) {
    fs.writeFileSync(indexFile, `export * from "./${slug}"\n`);
  } else {
    fs.appendFileSync(indexFile, `export * from "./${slug}"\n`);
  }
};
