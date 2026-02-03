import { IBaseFilters } from '../request-data.model';

export interface IPortfolioFormVal {
  caption: string;
  image: File;
}

export interface IPortfolio {
  id: string;
  imageUrl: string;
  caption?: string;
}

export interface IDeletePortfolioData {
  portfolioId: string;
  filter: IBaseFilters;
}
