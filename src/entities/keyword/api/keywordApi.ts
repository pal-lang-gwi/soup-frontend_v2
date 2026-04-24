import { apiClient } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/types';
import type { KeywordSearchParams, KeywordSearchResponseData, KeywordListParams, KeywordListResponseData } from '../model/type';

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
      '/api/v1/keywords',
      { params }
    );
    return response.data;
  },


};