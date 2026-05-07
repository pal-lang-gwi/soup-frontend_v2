import type { AdminNavItem, KeywordRequest, MetricCard, RequestStatus, StatusOption } from './types'

export const navItems: AdminNavItem[] = [
  { id: 'dashboard', label: '대시보드', icon: 'dashboard' },
  { id: 'users', label: '사용자', icon: 'users' },
  { id: 'keywords', label: '키워드', icon: 'keywords' },
  { id: 'contents', label: '콘텐츠', icon: 'contents' },
  { id: 'mail', label: '메일 로그', icon: 'mail' },
  { id: 'system', label: '시스템 로그', icon: 'system' },
]

export const dashboardMetrics: MetricCard[] = [
  {
    title: '오늘 발송 수',
    value: '1,284',
    change: '12.5%',
    meta: '어제 대비',
    icon: 'send',
    tone: 'green',
  },
  {
    title: '발송 실패 수',
    value: '18',
    change: '5',
    meta: '어제 대비',
    icon: 'warning',
    tone: 'red',
  },
  {
    title: '활성 구독자 수',
    value: '3,942',
    change: '3.2%',
    meta: '지난 7일 대비',
    icon: 'users',
    tone: 'green',
  },
  {
    title: '수집된 콘텐츠 수',
    value: '726',
    change: '8.7%',
    meta: '지난 7일 대비',
    icon: 'document',
    tone: 'green',
  },
]

export const keywordMetrics: MetricCard[] = [
  {
    title: '대기 요청',
    value: '42',
    change: '8',
    meta: '어제 대비',
    icon: 'clock',
    tone: 'amber',
  },
  {
    title: '오늘 승인',
    value: '18',
    change: '20%',
    meta: '어제 대비',
    icon: 'check',
    tone: 'green',
  },
  {
    title: '오늘 거절',
    value: '6',
    change: '2',
    meta: '어제 대비',
    icon: 'x',
    tone: 'red',
  },
  {
    title: '활성 키워드',
    value: '327',
    change: '12',
    meta: '어제 대비',
    icon: 'tag',
    tone: 'green',
  },
]

export const mailLogs = [
  { email: 'kim.minji@example.com', status: '성공', time: '2025-05-16 10:32:45' },
  { email: 'lee.junho@example.com', status: '성공', time: '2025-05-16 10:32:44' },
  { email: 'park.soyeon@example.com', status: '성공', time: '2025-05-16 10:32:44' },
  { email: 'choi.won@example.com', status: '실패', time: '2025-05-16 10:32:43' },
  { email: 'jung.hoon@example.com', status: '성공', time: '2025-05-16 10:32:42' },
]

export const contentSummaries = [
  {
    keyword: '생성형 AI',
    title: "OpenAI, 새로운 추론 모델 'o3' 출시",
    summary: "OpenAI가 복잡한 추론 능력을 강화한 새 모델 'o3'를 공개했습니다...",
    source: 'techcrunch.com',
  },
  {
    keyword: 'AI 반도체',
    title: "엔비디아, 차세대 GPU 'Blackwell Ultra' 공개",
    summary: "엔비디아가 HBM4를 지원하는 'Blackwell Ultra'를 발표하며...",
    source: 'theverge.com',
  },
  {
    keyword: 'AI 규제',
    title: 'EU, 인공지능법(AI Act) 가이드라인 발표',
    summary: 'EU 집행위원회가 AI Act의 세부 가이드라인을 공개하고...',
    source: 'europa.eu',
  },
  {
    keyword: 'AI 서비스',
    title: "구글, 검색에 'AI 요약' 기능 전면 도입",
    summary: '구글이 검색 결과 상단에 AI 요약을 기본 제공한다고 발표했습니다...',
    source: 'blog.google',
  },
]

export const popularKeywords = [
  { rank: 1, keyword: 'AI 에이전트', count: '1,256' },
  { rank: 2, keyword: '생성형 AI', count: '1,102' },
  { rank: 3, keyword: 'AI 반도체', count: '948' },
  { rank: 4, keyword: 'LLM', count: '812' },
  { rank: 5, keyword: 'AI 규제', count: '645' },
]

export const keywordCollectionStatus = [
  { keyword: 'AI 에이전트', percent: 92, status: '정상' },
  { keyword: '생성형 AI', percent: 88, status: '정상' },
  { keyword: 'AI 반도체', percent: 76, status: '주의' },
  { keyword: 'LLM', percent: 95, status: '정상' },
  { keyword: 'AI 규제', percent: 62, status: '주의' },
]

export const systemStatus = [
  { name: 'Redis Streams', status: '정상' },
  { name: 'Worker', status: '정상' },
  { name: 'API 상태', status: '정상' },
  { name: 'DB (PostgreSQL)', status: '정상' },
  { name: '외부 API 연동', status: '주의' },
]

export const recentErrors = [
  { message: '메일 발송 실패: SMTP 응답 오류 (550 5.7.1)', time: '10:32:43' },
  { message: '콘텐츠 수집 실패: timeout (newsapi.org)', time: '10:21:17' },
  { message: 'AI 요약 생성 실패: Rate limit exceeded', time: '09:58:02' },
  { message: '외부 API 인증 실패: 429 Too Many Requests', time: '09:42:11' },
]

export const initialKeywordRequests: KeywordRequest[] = [
  {
    id: 'KR1024',
    user: 'kim.minji@example.com',
    keyword: 'AI 에이전트',
    category: '생성형 AI',
    requestedAt: '2025-05-16 09:12',
    status: 'pending',
    reason: '업무 자동화와 에이전트 활용 사례를 지속적으로 받아보고 싶습니다.',
    duplicateInfo: '기존 유사 키워드 2건 존재',
    expectedDemand: '높음',
  },
  {
    id: 'KR1025',
    user: 'lee.junho@example.com',
    keyword: '반도체 패키징',
    category: 'AI 반도체',
    requestedAt: '2025-05-16 09:05',
    status: 'pending',
    reason: 'HBM 관련 이슈 모니터링',
    duplicateInfo: '중복 키워드 없음',
    expectedDemand: '높음',
  },
  {
    id: 'KR1026',
    user: 'park.soyeon@example.com',
    keyword: 'AI 정책',
    category: 'AI 규제',
    requestedAt: '2025-05-16 08:51',
    status: 'approved',
    reason: '유럽 규제 동향 확인',
    duplicateInfo: '기존 유사 키워드 1건 존재',
    expectedDemand: '보통',
  },
  {
    id: 'KR1027',
    user: 'choi.won@example.com',
    keyword: '밈코인',
    category: '기타',
    requestedAt: '2025-05-16 08:43',
    status: 'rejected',
    reason: '관심 키워드 테스트',
    duplicateInfo: '서비스 주제와 관련성 낮음',
    expectedDemand: '낮음',
  },
  {
    id: 'KR1028',
    user: 'jung.hoon@example.com',
    keyword: '로봇 자동화',
    category: 'AI 서비스',
    requestedAt: '2025-05-16 08:20',
    status: 'pending',
    reason: '산업 자동화 사례 수집',
    duplicateInfo: '중복 키워드 없음',
    expectedDemand: '높음',
  },
  {
    id: 'KR1029',
    user: 'han.yuri@example.com',
    keyword: 'LLM 평가',
    category: 'LLM',
    requestedAt: '2025-05-16 07:58',
    status: 'pending',
    reason: '모델 성능 비교 분석',
    duplicateInfo: '기존 유사 키워드 1건 존재',
    expectedDemand: '보통',
  },
]

export const categoryOptions = [
  '전체',
  '생성형 AI',
  'AI 반도체',
  'AI 규제',
  'AI 서비스',
  'LLM',
  '기타',
]

export const statusOptions: StatusOption[] = [
  { label: '전체', value: 'all' },
  { label: '대기', value: 'pending' },
  { label: '승인', value: 'approved' },
  { label: '거절', value: 'rejected' },
]

export const statusLabel: Record<RequestStatus, string> = {
  pending: '대기',
  approved: '승인',
  rejected: '거절',
}
