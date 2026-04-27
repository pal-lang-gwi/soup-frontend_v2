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
  

  // 시스템 키워드 목록 조회 
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
  
  // 내 키워드 목록 조회 
  export interface MyKeywordInfo {
    keywordId: number;
    keyword: string;
    registeredAt: number[]; 
  }
  
  export interface MyKeywordDto {
    subscriptionId: number;
    keywordInfo: MyKeywordInfo;
  }
  
  export interface MyKeywordListResponseData {
    myKeywordDtos: MyKeywordDto[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
  }

  //  키워드 구독
export interface SubscribeKeywordRequest {
    keywordId: number;
  }
  
  export interface SubscribeKeywordResponseData {
    keywordId: number;
    keywordName: string;
  }
  
  // 키워드 구독 해제
  export interface UnsubscribeKeywordResponseData {
    userId: number;
    keywordName: string;
  }