export interface ProjectConfig {
  id: string;
  name: string;
  category: string;
  folder: string;
  frameCount: number;
  ext?: string;
  overrides?: { [key: number]: string };
}

export const projects: ProjectConfig[] = [
  {
    id: "zoner",
    name: "Zoner - Measure area app",
    category: "uiux",
    folder: "Zoner",
    frameCount: 21,
    ext: "webp"
  },
  {
    id: "meyu",
    name: "Meyu - Food dating app",
    category: "uiux",
    folder: "Meyu",
    frameCount: 30,
    ext: "webp"
  },
  {
    id: "mlegend",
    name: "MLegend - Đèn chiếu sáng",
    category: "other",
    folder: "MLegend",
    frameCount: 7,
    ext: "webp"
  }, 
  {
    id: "mrsgrand",
    name: "Mrs.Grand - Hoa hậu quý bà",
    category: "other",
    folder: "MrsGrand",
    frameCount: 5,
    ext: "webp"
  },
  {
    id: "lang-gio",
    name: "Làng Gió",
    category: "other",
    folder: "lang-gio",
    frameCount: 0,
    ext: "webp"
  },
  {
    id: "pushup-counter",
    name: "Pushup Counter",
    category: "uiux",
    folder: "pushup-counter",
    frameCount: 24,
    ext: "webp"
  },
  {
    id: "stitch-photos",
    name: "Stitch Photos",
    category: "uiux",
    folder: "stitch-photos",
    frameCount: 14,
    ext: "webp"
  },
  {
    id: "businesscard-maker",
    name: "Business Card Maker",
    category: "uiux",
    folder: "businesscard-maker",
    frameCount: 0,
    ext: "webp"
  },
  {
    id: "try-on-hairstyle",
    name: "Try On Hairstyle",
    category: "uiux",
    folder: "try-on-hairstyle",
    frameCount: 0,
    ext: "webp"
  },
  {
    id: "wardrobe",
    name: "Smart Wardrobe",
    category: "uiux",
    folder: "wardrobe",
    frameCount: 0,
    ext: "webp"
  }
];
