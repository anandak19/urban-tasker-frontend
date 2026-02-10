export type TImageFile = string | number | null | undefined;

export interface ICreateCategory {
  name: string;
  image: string;
}

// category document from db --in use
export interface ICategoryData {
  id: string;
  name: string;
  description?: string;
  image: string;
  isActive: boolean;
  slug: string;
}
