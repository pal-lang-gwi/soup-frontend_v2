import { apiClient } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/types';
import type { KeywordSearchParams, 
  KeywordSearchResponseData,
  KeywordListParams,
  KeywordListResponseData,
  MyKeywordListResponseData,
  SubscribeKeywordRequest,
  SubscribeKeywordResponseData,
  UnsubscribeKeywordResponseData } from '../model/type';

export const keywordApi = {
  // 키워드 검색
  searchKeywords: async (params: KeywordSearchParams) => {

    const response = await apiClient.get<ApiResponse<KeywordSearchResponseData>>(
      '/keywords/search',
      { params } 
    );
    return response.data;
  },

  // 키워드 목록 조회
  getKeywords: async (params: KeywordListParams) => {
    const response = await apiClient.get<ApiResponse<KeywordListResponseData>>(
      '/keywords',
      { params }
    );
    return response.data;
  },

  // 내 키워드 목록 조회
  getMyKeywords: async (params?: KeywordListParams) => {
    const response = await apiClient.get<ApiResponse<MyKeywordListResponseData>>(
      '/users/me/keywords',
      { params }
    );
    return response.data;
  },

  // 키워드 구독
  subscribeKeyword: async (data: SubscribeKeywordRequest) => {
    const response = await apiClient.post<ApiResponse<SubscribeKeywordResponseData>>(
      '/keywords/subscriptions',
      data
    );
    return response.data;
  },

  // 키워드 구독 해제
  unsubscribeKeyword: async (subscriptionId: number) => {
    const response = await apiClient.post<ApiResponse<UnsubscribeKeywordResponseData>>(
      `/keywords/subscriptions/${subscriptionId}`
    );
    return response.data;
  },

};
