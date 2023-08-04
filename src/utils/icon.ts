import * as fs from "fs";
import * as path from "path";

import { TFamily } from "@/@types/family";
import { TIcon } from "@/@types/icon";
import { TManifest } from "@/@types/manifest";
import { str2camel } from "@/utils/camelCase";
import { saveIconFile } from "@/utils/fs";
import { normalize } from "@/utils/normalize";
import { uuid } from "@/utils/uuid";

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
  "Material Icons": "filled",
  "Material Icons Outlined": "outlined",
  "Material Icons Round": "rounded",
  "Material Icons Sharp": "sharp",
  "Material Icons Two Tone": "twotone",
  "Material Symbols Outlined": "outlined",
  "Material Symbols Rounded": "rounded",
  "Material Symbols Sharp": "sharp",
};

const saveIcon = async (manifest: TManifest, icon: TIcon, family: TFamily) => {
  const svg = await fetchIcon(manifest, icon, family);
  const iconName = normalize(
    [...icon.name.split("_"), suffix[family]]
      .map((text) => str2camel(text))
      .join("")
  );
  const slug = [...icon.name.split("_"), suffix[family]].join("-");
  const baseDir = path.join(
    __dirname,
    "../",
    family.includes("Symbol") ? "symbols" : "icons"
  );
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }

  saveIconFile(
    family.includes("Symbol") ? "MaterialSymbols.tsx" : "MaterialIcons.tsx",
    baseDir,
    slug,
    iconName,
    svg
  );
};

const fetchIcon = async (manifest: TManifest, icon: TIcon, family: TFamily) => {
  const snakedFamilyName = family.replace(/\s/g, "").toLowerCase();
  const url = family.includes("Symbol")
    ? `http://${manifest.host}/s/i/short-term/release/${snakedFamilyName}/${icon.name}/default/24px.svg`
    : `http://${manifest.host}/s/i/${snakedFamilyName}/${icon.name}/v${icon.version}/24px.svg`;
  const req = await fetch(url);
  let svg = (await req.text())
    .replace(/<svg.*width="24">([\s\S]*)<\/svg>/, "$1")
    .replace(/class=".*?"/gi, "")
    .replace(/xlink:href/gi, "xlinkHref");
  const classMatch = svg.match(/(?:id|class)="(.*?)"/gi);
  if (classMatch) {
    for (const item of classMatch) {
      const id = RegExp(/(?:id|class)="(.*?)"/i).exec(item);
      if (!id) continue;
      svg = svg.replace(
        RegExp(`/${id[1]}/gi`),
        `__material_icons_${id[1]}_${uuid()}`
      );
    }
  }
  svg = svg.replace(/style="fill:none"/gi, `style={{fill:"none"}}`);

  return svg;
};
