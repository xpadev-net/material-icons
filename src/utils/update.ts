import { TFamily } from "@/@types/family";

import { processIcon } from "./icon";
import { getManifest } from "./manifest";
import { save } from "./version";

const update = async () => {
  const manifest = await getManifest();
  const getSupportedFamilies = (unsupportedFamilies: TFamily[]) => {
    return manifest.families.filter(
      (family) => !unsupportedFamilies.includes(family)
    );
  };
  for (const icon of manifest.icons) {
    await processIcon(
      manifest,
      icon,
      getSupportedFamilies(icon.unsupported_families)
    );
  }
  save();
};

void update();
