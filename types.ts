
export interface Design {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: number;
  techPack?: TechPack;
}

export interface TechPack {
  bom: BOMItem[];
  measurements: Measurement[];
  constructionNotes: string[];
}

export interface BOMItem {
  component: string;
  material: string;
  details: string;
}

export interface Measurement {
  point: string;
  tolerance: string;
  sizes: { [key: string]: string };
}

export interface BrandAsset {
  id: string;
  name: string;
  value: string; // Hex code or logo URL
  type: 'color' | 'logo' | 'fit';
}

export interface Supplier {
  name: string;
  specialty: string;
  location: string;
  contact: string;
}

export type AppView = 'dashboard' | 'ideation' | 'production' | 'trends';
