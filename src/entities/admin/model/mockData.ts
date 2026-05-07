import type { AdminKeywordListItemDto, AdminKeywordRequestDto } from './type'

export const mockKeywordRequests: AdminKeywordRequestDto[] = [
  {
    requestId: 1024,
    keyword: {
      keywordId: 301,
      name: 'AI 에이전트',
      status: 'PENDING',
      requestedDate: [2025, 5, 16, 9, 12, 0],
      rejectionReason: null,
    },
    requestedBy: {
      userId: 11,
      email: 'kim.minji@example.com',
    },
  },
  {
    requestId: 1025,
    keyword: {
      keywordId: 302,
      name: '반도체 패키징',
      status: 'PENDING',
      requestedDate: [2025, 5, 16, 9, 5, 0],
      rejectionReason: null,
    },
    requestedBy: {
      userId: 12,
      email: 'lee.junho@example.com',
    },
  },
  {
    requestId: 1026,
    keyword: {
      keywordId: 303,
      name: 'AI 정책',
      status: 'PENDING',
      requestedDate: [2025, 5, 16, 8, 51, 0],
      rejectionReason: null,
    },
    requestedBy: {
      userId: 13,
      email: 'park.soyeon@example.com',
    },
  },
  {
    requestId: 1027,
    keyword: {
      keywordId: 304,
      name: 'LLM 평가',
      status: 'REJECTED',
      requestedDate: [2025, 5, 16, 7, 58, 0],
      rejectionReason: '기존 키워드와 범위가 중복됩니다.',
    },
    requestedBy: {
      userId: 14,
      email: 'han.yuri@example.com',
    },
  },
]

export const mockKeywords: AdminKeywordListItemDto[] = [
  { id: 201, name: '생성형 AI', normalizedName: 'generative-ai' },
  { id: 202, name: 'AI 반도체', normalizedName: 'ai-semiconductor' },
  { id: 203, name: 'AI 규제', normalizedName: 'ai-regulation' },
  { id: 204, name: 'AI 서비스', normalizedName: 'ai-service' },
  { id: 205, name: 'LLM', normalizedName: 'llm' },
  { id: 206, name: '로봇 자동화', normalizedName: 'robot-automation' },
]
