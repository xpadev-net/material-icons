import * as fs from "fs";

const FILENAME = __dirname + "/versions.json";

type TVersions = {
  [family: string]: {
    [category: string]: {
      [name: string]: number;
    };
  };
};

export const versions = JSON.parse(
  fs.readFileSync(FILENAME).toString()
) as TVersions;

export const save = () => {
  fs.writeFileSync(FILENAME, JSON.stringify(versions));
};
