// 키워드 검색
export interface SearchKeywordItem {
    subscriptionId: string | null;
    keywordId: string;
    name: string;
    isSubscribed: string; // true/false
  }
  
  export interface SearchKeywordResponse {
    success: boolean;
    response: {
      keywords: SearchKeywordItem[];
    } | null;
    error: {
      message: string;
      status: number;
    } | null;
  }
  

  // 내 키워드
  export interface MyKeywordItem {
    subscriptionId: number;
    keywordInfo: {
      keywordId: number;
      keyword: string;
      registeredAt: string; 
    };
  }
  
  // 키워드 구독/해제
  export interface SubscribedKeywordResult {
    keywordId: string;
    keywordName: string;
  }
  
  export interface UnsubscribedKeywordResult {
    userId: string;
    unsubscribedKeyword: string;
  }
  
  // 신규 키워드
  export interface RequestKeywordResult {
    requestId: number;
    keyword: string;
    status: string; 
  }