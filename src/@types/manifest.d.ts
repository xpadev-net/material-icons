import { TFamily } from "@/@types/family";
import { TIcon } from "@/@types/icon";

export type TManifest = {
  host: string;
  asset_url_pattern: string;
  families: TFamily[];
  icons: TIcon[];
};
