import * as fs from "fs";
import * as path from "path";

import { TFamily } from "@/@types/family";
import { TIcon } from "@/@types/icon";
import { TManifest } from "@/@types/manifest";
import { str2camel } from "@/utils/camelCase";
import { saveIconFile } from "@/utils/fs";
import { normalize } from "@/utils/normalize";

import { versions } from "./version";

export const processIcon = async (
  manifest: TManifest,
  icon: TIcon,
  supportedFamilies: TFamily[]
) => {
  for (const family of supportedFamilies) {
    if (!isNeedToUpdate(icon, family)) continue;
    await saveIcon(manifest, icon, family);
  }
};

const isNeedToUpdate = (icon: TIcon, family: TFamily) => {
  versions[family] ??= {};
  const categories = versions[family];
  if (!categories) throw new Error();
  categories[icon.categories[0]] ??= {};
  const icons = categories[icon.categories[0]];
  if (!icons) throw new Error();
  return icons[icon.name] !== icon.version;
};

const suffix: { [key in TFamily]: string } = {
  "Material Icons": "Filled",
  "Material Icons Outlined": "Outlined",
  "Material Icons Round": "Rounded",
  "Material Icons Sharp": "Sharp",
  "Material Icons Two Tone": "TwoTone",
  "Material Symbols Outlined": "Outlined",
  "Material Symbols Rounded": "Rounded",
  "Material Symbols Sharp": "Sharp",
};

const saveIcon = async (manifest: TManifest, icon: TIcon, family: TFamily) => {
  const svg = (await fetchIcon(manifest, icon, family)).replace(
    /<svg.*width="24">([\s\S]*)<\/svg>/,
    "$1"
  );
  const iconName = normalize(
    icon.name
      .split("_")
      .map((text) => str2camel(text))
      .join("") + suffix[family]
  );
  const baseDir = path.join(
    __dirname,
    "../",
    family.includes("Symbol") ? "symbols" : "icons",
    "assets"
  );
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  saveIconFile(baseDir, iconName, svg);
};

const fetchIcon = async (manifest: TManifest, icon: TIcon, family: TFamily) => {
  const snakedFamilyName = family.replace(/\s/g, "").toLowerCase();
  const url = family.includes("Symbol")
    ? `http://${manifest.host}/s/i/short-term/release/${snakedFamilyName}/${icon.name}/default/24px.svg`
    : `http://${manifest.host}/s/i/${snakedFamilyName}/${icon.name}/v${icon.version}/24px.svg`;
  const req = await fetch(url);
  return await req.text();
};
