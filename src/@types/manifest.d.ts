import { TFamily } from "./family";
import { TIcon } from "./icon";

export type TManifest = {
  host: string;
  asset_url_pattern: string;
  families: TFamily[];
  icons: TIcon[];
};
