import * as fs from "fs";
import * as path from "path";

export const saveIconFile = (
  baseDir: string,
  dirName: string,
  name: string,
  svg: string
) => {
  const dir = path.join(baseDir, dirName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(
    path.join(dir, `${name}.presenter.tsx`),
    `import React from "react";

import { IconProps } from "@/@types/IconProps";

import { BaseSvg } from "../../BaseSvg";

export const ${name}Icon = (props: IconProps) => {
  return (
    <BaseSvg {...props}>
      ${svg}
    </BaseSvg>
  );
};
`
  );
  fs.writeFileSync(
    path.join(dir, `index.tsx`),
    `export * from "./${name}.presenter";
`
  );
  fs.writeFileSync(
    path.join(dir, `${name}.stories.tsx`),
    `import type { Meta, StoryObj } from "@storybook/react";

import { ${name}Icon } from "./";

type Story = StoryObj<typeof ${name}Icon>

const meta: Meta<typeof ${name}Icon> = {
  component: ${name}Icon,
  argTypes: {},
};

export default meta;

export const Default: Story = {};
`
  );
  const indexFile = path.join(baseDir, "index.tsx");
  if (!fs.existsSync(indexFile)) {
    fs.writeFileSync(indexFile, `export * from "./${dirName}/"\n`);
  } else {
    fs.appendFileSync(indexFile, `export * from "./${dirName}/"\n`);
  }
  const dtsFile = path.join(baseDir, "index.d.ts");
  if (!fs.existsSync(dtsFile)) {
    fs.writeFileSync(
      dtsFile,
      `import {IconProps} from "../../@types/IconProps";\nimport React from "react";\nexport declare const ${name}Icon: (props: IconProps) => React.JSX.Element;\n`
    );
  } else {
    fs.appendFileSync(
      dtsFile,
      `export declare const ${name}Icon: (props: IconProps) => React.JSX.Element;\n`
    );
  }
};
