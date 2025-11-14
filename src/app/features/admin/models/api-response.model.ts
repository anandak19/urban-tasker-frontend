import {
  IApiResponseSuccess,
  IFindAllResponseData,
} from '@shared/models/api-response.model';
import { ICategoryData } from './category.interface';

// Find All Categories API Response
export type IFindAllCategoriesResponse = IApiResponseSuccess<
  IFindAllResponseData<ICategoryData>
>;
