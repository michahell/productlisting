export interface Dimensions {
  width: number;
  height: number;
}

export interface ApiProduct {
  id: string;
  title: string;
  artist: string;
  style: string;
  price: number;
  dimensions_cm: Dimensions;
  medium: string;
  year_original: number;
  stock_level: number;
  tags: string[];
  description: string;
  thumbnailUrl: string;
}

export interface ApiProducts {
  webshop: string;
  currency: string;
  products: ApiProduct[];
}
