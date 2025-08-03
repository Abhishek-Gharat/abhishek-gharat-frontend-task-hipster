export type ThemeType = 'theme1' | 'theme2' | 'theme3';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  layout: 'default' | 'sidebar' | 'grid';
}

export const themeConfigs: Record<ThemeType, ThemeConfig> = {
  theme1: {
    id: 'theme1',
    name: 'Minimalist',
    description: 'Clean light theme with modern typography',
    layout: 'default'
  },
  theme2: {
    id: 'theme2',
    name: 'Dark Sidebar',
    description: 'Professional dark theme with sidebar navigation',
    layout: 'sidebar'
  },
  theme3: {
    id: 'theme3',
    name: 'Colorful Cards',
    description: 'Vibrant theme with playful card-based layout',
    layout: 'grid'
  }
};

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images?: string[]; // DummyJSON provides multiple images
  thumbnail?: string; // DummyJSON provides thumbnail
  brand?: string; // DummyJSON includes brand
  stock?: number; // DummyJSON includes stock info
  discountPercentage?: number; // DummyJSON includes discount
  rating: {
    rate: number;
    count: number;
  };
}