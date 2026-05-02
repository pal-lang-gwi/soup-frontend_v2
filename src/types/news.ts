export interface NewsDtos {
    keyword: string;
    keywordName?: string;
    longSummary: string;
    createdDate: string | number[];
    articles: Article[];
    relatedKeywords?: string[];
}

export interface NewsListResponseData {
  newsDtos: NewsDtos[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface NewsListResponse {
    success: boolean;
    data: NewsListResponseData;
}

export interface Article {
  id?: number
  title: string
  summary: string
  image?: string
  url?: string
}
