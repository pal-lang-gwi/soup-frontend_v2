export interface NewsDtos {
    keyword: string;
    longSummary: string;
    createdDate: string;
    articles: Article[];
}

export interface NewsListResponse{
    success: boolean;
    data: {
        newsDtos: NewsDtos[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
    }
}

export interface Article {
  id: number
  title: string
  summary: string
  image: string
}