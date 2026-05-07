import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './NewsPage.module.scss'
import { NavBarLoggedIn } from '@/widgets/NavBar/NavBarLoggedIn'
import mailImg from '@/shared/assets/mail.png'
import { Button } from '@/shared/ui/Button/Button'

interface NewsPageArticle {
  id: number
  title: string
  summary: string
  image: string
}

interface NewsPageBlock {
  keyword: string
  longSummary: string
  createdDate: string
  articles: NewsPageArticle[]
}

const newsBlock: NewsPageBlock = {
  keyword: 'AI',
  longSummary:
    "대한민국 정부는 9월 2회 국무회의에서 대통령 직속 '국가인공지능위원회' 설치...",
  createdDate: '2025. 9. 3.',
  articles: [
    { id: 1, title: 'A', summary: '요약입니다...', image: '/sample-news.jpg' },
    { id: 2, title: 'B', summary: '요약입니다...', image: '/sample-news.jpg' },
    { id: 3, title: 'C', summary: '요약입니다...', image: '/sample-news.jpg' },
    { id: 4, title: 'D', summary: '요약입니다...', image: '/sample-news.jpg' }
  ]
}

const NewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsPageArticle | null>(null)
  const [keyword, setKeyword] = useState('')
  const debounceRef = useRef<number | null>(null)
  const navigate = useNavigate()
  const detailPanelRef = useRef<HTMLDivElement | null>(null)

  // Cleanup for debounce
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  // 검색창 변경
  const handleKeywordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setKeyword(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = window.setTimeout(() => {
      console.log('자동완성 API 요청:', value)
    }, 300)
  }, [])

  // 검색 버튼
  const handleKeywordSearch = useCallback(() => {
    if (!keyword.trim()) return
    navigate(`/news?keyword=${encodeURIComponent(keyword)}`)
    console.log("검색한 키워드: "+ keyword)
  }, [keyword, navigate])

  // 상세 열릴 때 스크롤 초기화
  useEffect(() => {
    if (selectedArticle && detailPanelRef.current) {
      detailPanelRef.current.scrollTo(0, 0)
    }
  }, [selectedArticle])

  // 카드 선택
  const handleSelectArticle = useCallback((article: NewsPageArticle) => {
    setSelectedArticle(article)
  }, [])

  return (
    <div className={styles.root}>
      <NavBarLoggedIn />

      <div className={styles.contentWrapper}>
        
        {/* LEFT AREA */}
        <main
          className={`${styles.leftArea} ${selectedArticle ? styles.shrink : ''}`}
        >
          {/* HERO */}
          <section className={styles.hero}>
            <div className={styles.heroInner}>

              <div className={styles.heroLeft}>
                <div className={styles.badge}>나만의 관심사로 시작하는 하루</div>

                <div className={styles.searchRow}>
                  <div className={styles.searchBox}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                      className={styles.searchInput}
                      placeholder="관심 키워드를 입력하세요"
                      value={keyword}
                      onChange={handleKeywordChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleKeywordSearch()
                      }}
                    />
                  </div>

                  <Button
                    size="s"
                    typeStyle="type2"
                    onClick={handleKeywordSearch}
                  >
                    검색
                  </Button>
                </div>
              </div>

              <div className={styles.heroRight}>
                <img src={mailImg} alt="mail" className={styles.mailImg} />
              </div>

            </div>
          </section>

          {/* KEYWORD */}
          <section className={styles.keywordSection}>
            <div className={styles.keywordLabel}>KEYWORD</div>
            <div className={styles.keywordValue}>
              &quot;{newsBlock.keyword}&quot;
            </div>
          </section>

          {/* 카드 리스트 */}
          <section className={styles.listSection}>
            <div className={styles.cardGrid}>
              {newsBlock.articles.map((article) => (
                <div
                  key={article.id}
                  className={styles.card}
                  onClick={() => handleSelectArticle(article)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardBody}>
                    <div className={styles.cardTitle}>{article.title}</div>
                    <div className={styles.cardSummary}>{article.summary}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className={styles.footer}>푸터자리</footer>
        </main>

        {/* RIGHT: 상세 패널 */}
        <aside
          ref={detailPanelRef}
          className={`${styles.detailPanel} ${selectedArticle ? styles.open : ''}`}
        >
          {selectedArticle && (
            <>
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedArticle(null)}
              >
                ✕
              </button>

              <h3 className={styles.detailTitle}>
                {selectedArticle.title} - 상세 분석
              </h3>

              <div className={styles.detailMeta}>
                <span>SOUP NEWS</span>
                <span>{newsBlock.createdDate}</span>
              </div>

              <p className={styles.detailContent}>{newsBlock.longSummary}</p>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}

export default NewsPage
