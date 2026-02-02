export interface IPortfolioFormVal {
  caption: string;
  image: File;
}

export interface IPortfolio {
  id: string;
  imageUrl: string;
  caption?: string;
}
