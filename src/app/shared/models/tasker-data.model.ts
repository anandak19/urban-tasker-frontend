import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { IOptionData } from './form-inputs.model';

export interface ITaskerCardData
  extends Pick<IListTasker, 'firstName' | 'lastName' | 'profileImageUrl'> {
  city: string;
}

export interface ITaskerAbout {
  about: string;
}

export interface IWorkCategories {
  workCategories: IOptionData[];
}

//portfolio
export interface ICreatePortfolioImage {
  imageFile: string;
  caption?: string;
}

export interface IPortfolioImage
  extends Omit<ICreatePortfolioImage, 'imageFile'> {
  id: string;
  userId: string;
  taskerId?: string;
  imageUrl: string;
}
