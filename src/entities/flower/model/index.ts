import { createEvent, createStore, sample } from "effector";

export type VaseType =
  | "round"
  | "square"
  | "tall"
  | "wide"
  | "oval"
  | "modern"
  | "vintage"
  | "slim";
export type StemType = "straight" | "curved" | "branched";
export type BudType = "rose" | "tulip" | "daisy" | "lily";

export type Flower = {
  vase: VaseType;
  stem: StemType;
  bud: BudType;
  color: string;
  petalCount: number;
  secondaryColor: string;
  height: number;
  backgroundColor: string;
};

const vaseTypes: VaseType[] = [
  "round",
  "square",
  "tall",
  "wide",
  "oval",
  "modern",
  "vintage",
  "slim",
];
const stemTypes: StemType[] = ["straight", "curved", "branched"];
const budTypes: BudType[] = ["rose", "tulip", "daisy", "lily"];

const colors: string[] = [
  "#FFB7C5", // Soft Pink
  "#E8BFD8", // Dusty Rose
  "#FFE4E1", // Misty Rose
  "#E6E6FA", // Lavender
  "#F0E6EF", // Pale Lilac
  "#FFF0F5", // Pale Rose
  "#F8DFE8", // Light Pink
  "#E8D1DC", // Vintage Rose
  "#F5E6EA", // Blush Pink
  "#E6CCD9", // Soft Mauve
  "#DDA0DD", // Plum
  "#D8BFD8", // Thistle
  "#FFE1FF", // Pale Magenta
  "#F0BBD1", // Light Rose
  "#E6A9EC", // Soft Purple
  "#F4BBFF", // Light Orchid
  "#FFB6C1", // Light Pink
  "#FFC0CB", // Pink
  "#FFB5C5", // Salmon Pink
  "#EEA2AD", // Light Coral
];

const centerColors: string[] = [
  "#F0E68C", // Khaki
  "#DEB887", // BurlyWood
  "#D2B48C", // Tan
  "#DAA520", // GoldenRod
  "#FFE4B5", // Moccasin
  "#FFDAB9", // PeachPuff
  "#EEE8AA", // PaleGoldenRod
  "#F5DEB3", // Wheat
  "#FFD700", // Gold
  "#FFA500", // Orange
  "#FFDB58", // Mustard
  "#FFB90F", // Dark Goldenrod
  "#FFC125", // Golden Yellow
  "#FFB347", // Pastel Orange
  "#FFA07A", // Light Salmon
];

const backgroundColors: string[] = [
  "#E8F3E8", // Светло-зеленый
  "#F3E8F3", // Светло-сиреневый
  "#F3F0E8", // Светло-желтый
  "#E8F0F3", // Светло-голубой
  "#F3E8EA", // Светло-розовый
  "#EAF3E8", // Мятный
  "#F0E8F3", // Лавандовый
  "#F3EBE8", // Персиковый
];

export const generateRandomFlower = (): Flower => {
  const baseColor = colors[Math.floor(Math.random() * colors.length)];
  const centerColor =
    centerColors[Math.floor(Math.random() * centerColors.length)];
  const bgColor =
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  return {
    vase: vaseTypes[Math.floor(Math.random() * vaseTypes.length)],
    stem: stemTypes[Math.floor(Math.random() * stemTypes.length)],
    bud: budTypes[Math.floor(Math.random() * budTypes.length)],
    color: baseColor,
    petalCount: Math.floor(Math.random() * 4) + 5, // 5-8 лепестков
    secondaryColor: centerColor,
    height: Math.floor(Math.random() * 60) + 140, // 140-200 высота
    backgroundColor: bgColor,
  };
};

export const $currentFlower = createStore<Flower>(generateRandomFlower());
export const regenerateFlower = createEvent();

sample({
  clock: regenerateFlower,
  fn: generateRandomFlower,
  target: $currentFlower,
});
