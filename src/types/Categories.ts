export type ApiType = "neko" | "waifu";

export const validApiTypes: ApiType[] = ["neko", "waifu"];

export const categoryApiType: Record<string, ApiType> = {
  neko: "neko",
  husbando: "neko",
  kitsune: "neko",
  waifu: "neko",
  maid: "waifu",
  "marin-kitagawa": "waifu",
  "mori-calliope": "waifu",
  "raiden-shogun": "waifu",
  oppai: "waifu",
  selfies: "waifu",
  uniform: "waifu",
};

export const CAT_CATEGORIES = Object.keys(categoryApiType).filter(
  (category) => categoryApiType[category] === "neko"
);
export const WAIFU_CATEGORIES = Object.keys(categoryApiType).filter(
  (category) => categoryApiType[category] === "waifu"
);
