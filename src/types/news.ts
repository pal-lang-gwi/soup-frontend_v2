export interface NewsDtos {
    keyword: string;
    keywordName?: string;
    longSummary: string;
    createdDate: string | number[];
    articles: MailArticle[];
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

export interface MailArticle {
  title: string
  summary: string
  url?: string
}
