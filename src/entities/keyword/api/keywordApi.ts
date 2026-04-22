import { apiClient } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/api/types';
import type { KeywordSearchParams, KeywordSearchResponseData } from '../model/type';

export const keywordApi = {
  searchKeywords: async (params: KeywordSearchParams) => {

    const response = await apiClient.get<ApiResponse<KeywordSearchResponseData>>(
      '/keywords/search',
      { params } 
    );
    return response.data;
  },
};