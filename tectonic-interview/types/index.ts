export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Annotation {
  id: string;
  productId: string;
  x: number; // x position in percentage (0-100)
  y: number; // y position in percentage (0-100)
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  src?: string; // Path to the image or video file
  annotations: Annotation[];
}

export interface Look {
  id: string;
  title: string;
  media: Media[];
}
