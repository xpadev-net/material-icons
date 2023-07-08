import { TManifest } from "@/@types/manifest";

export const getManifest = async () => {
  const req = await fetch(
    "http://fonts.google.com/metadata/icons?incomplete=1&key=material_symbols"
  );
  const text = await req.text();
  return JSON.parse(text.slice(text.indexOf("{"))) as TManifest;
};
