export type ApiType = "neko" | "waifu.im" | "waifu.pics";

export const validApiTypes: ApiType[] = ["neko", "waifu.im", "waifu.pics"];

export const categoryApiType: Record<string, ApiType> = {
  neko: "neko",
  husbando: "neko",
  kitsune: "neko",
  waifu: "neko",
  maid: "waifu.im",
  "marin-kitagawa": "waifu.im",
  "mori-calliope": "waifu.im",
  "raiden-shogun": "waifu.im",
  oppai: "waifu.im",
  selfies: "waifu.im",
  uniform: "waifu.im",
  shinobu: "waifu.pics",
  megumin: "waifu.pics",
  bully: "waifu.pics",
  cuddle: "waifu.pics",
  cry: "waifu.pics",
  hug: "waifu.pics",
  awoo: "waifu.pics",
  kiss: "waifu.pics",
  lick: "waifu.pics",
  pat: "waifu.pics",
  smug: "waifu.pics",
  bonk: "waifu.pics",
  yeet: "waifu.pics",
  blush: "waifu.pics",
  smile: "waifu.pics",
  wave: "waifu.pics",
  highfive: "waifu.pics",
  handhold: "waifu.pics",
  nom: "waifu.pics",
  bite: "waifu.pics",
  glomp: "waifu.pics",
  slap: "waifu.pics",
  kill: "waifu.pics",
  kick: "waifu.pics",
  happy: "waifu.pics",
  wink: "waifu.pics",
  poke: "waifu.pics",
  dance: "waifu.pics",
  cringe: "waifu.pics",
};

export const CAT_CATEGORIES = Object.keys(categoryApiType).filter(
  (category) => categoryApiType[category] === "neko"
);
export const WAIFUIM_CATEGORIES = Object.keys(categoryApiType).filter(
  (category) => categoryApiType[category] === "waifu.im"
);
export const WAIFUPICS_CATEGORIES = Object.keys(categoryApiType).filter(
  (category) => categoryApiType[category] === "waifu.pics"
);
