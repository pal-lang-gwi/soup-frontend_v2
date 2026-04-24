export interface Keyword {
    id: number;
    name: string;
    normalizedName: string;
    isSubscribed: boolean;
  }
  
  // 키워드 검색
  export interface KeywordSearchResponseData {
    keywords: Keyword[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface KeywordSearchParams {
    keyword: string;
    page?: number;     // 기본값 0
    size?: number;     // 기본값 20
  }

  export interface KeywordListParams {
    page?: number;    
    size?: number;     
    sort?: string;    
  }
  
  export interface KeywordDto {
    id: number;               
    name: string;              
    normalizedName: string;   
  }
  
  export interface KeywordListResponseData {
    keywordResponseDtos: KeywordDto[]; 
    totalElements: number;             
    totalPages: number;               
    currentPage: number;              
  }