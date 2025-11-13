export type TImageFile = string | number | null | undefined;

export interface ICreateCategory {
  name: string;
  image: string;
}

// category document from db
export interface ICategoryData {
  name: string;
  imageUrl: string;
  isActive: boolean;
  slug: string;
}
