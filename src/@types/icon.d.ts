import { TFamily } from "@/@types/family";

export type TIcon = {
  name: string;
  version: number;
  unsupported_families: TFamily[];
  categories: [string];
  sizes_px: number[];
};
