import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { newsApi } from '@/entities/news/api/newsApi'
import type { NewsDtos } from '@/types/news'
import { NavBarLoggedOut } from '@/widgets/NavBar/NavBarLoggedOut'
import { Footer } from '@/shared/ui/Footer'
import { Button } from '@/shared/ui/Button/Button'
import mailImg from '@/shared/assets/mail.png'
import styles from './MailPage.module.scss'

type LoadState = 'idle' | 'loading' | 'success' | 'empty' | 'noParams' | 'error'

const normalizeKeyword = (value: string) => value.trim().toLowerCase()

const formatDate = (value?: string | number[]) => {
  if (!value) return ''

  if (Array.isArray(value)) {
    const [year, month, day] = value
    if (!year || !month || !day) return ''

    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
  }

  return value.slice(0, 10).replaceAll('-', '.')
}

const MailPage = () => {
  const [searchParams] = useSearchParams()
  const hasKeywordParam = searchParams.has('keyword')
  const hasDateParam = searchParams.has('date')
  const keyword = searchParams.get('keyword') ?? ''
  const date = searchParams.get('date') ?? ''
  const [news, setNews] = useState<NewsDtos | null>(null)
  const [loadState, setLoadState] = useState<LoadState>('idle')

  const pageTitle = useMemo(() => {
    if (keyword.trim()) return keyword
    return news?.keywordName ?? news?.keyword ?? '오늘의 뉴스'
  }, [keyword, news])

  useEffect(() => {
    let cancelled = false

    if (!hasKeywordParam || !hasDateParam || !keyword.trim() || !date.trim()) {
      setLoadState('noParams')
      setNews(null)
      return () => {
        cancelled = true
      }
    }

    const loadNews = async () => {
      try {
        setLoadState('loading')

        let page = 0
        let totalPages = 1
        const allNews: NewsDtos[] = []

        while (page < totalPages) {
          const data = await newsApi.getDailyNews({
            startDate: date,
            endDate: date,
            page,
          })

          if (cancelled) return

          allNews.push(...data.newsDtos)
          totalPages = data.totalPages
          page += 1
        }

        if (cancelled) return

        const matchedNews = allNews.find((item) => {
          const itemKeyword = item.keywordName ?? item.keyword

          return normalizeKeyword(itemKeyword) === normalizeKeyword(keyword)
        })

        if (cancelled) return

        setNews(matchedNews ?? null)
        setLoadState(matchedNews ? 'success' : 'empty')
      } catch (error) {
        if (cancelled) return

        console.error('메일 뉴스 상세 조회에 실패했습니다.', error)
        setLoadState('error')
        setNews(null)
      }
    }

    loadNews()

    return () => {
      cancelled = true
    }
  }, [hasKeywordParam, hasDateParam, keyword, date])

  return (
    <div className={styles.root}>
      <NavBarLoggedOut />

      <main className={styles.content}>
        {loadState === 'loading' && (
          <div className={styles.status}>뉴스를 불러오고 있어요.</div>
        )}

        {loadState === 'error' && (
          <div className={styles.status}>뉴스를 불러오지 못했어요. 잠시 후 다시 시도해주세요.</div>
        )}

        {loadState === 'empty' && (
          <div className={styles.status}>메일 링크에 맞는 뉴스를 찾지 못했어요.</div>
        )}

        {loadState === 'noParams' && (
          <div className={styles.status}>메일 링크에 필요한 뉴스 정보가 없어요.</div>
        )}

        {loadState === 'success' && news && (
          <>
            <header className={styles.header}>
              <div>
                <p className={styles.label}>SOUP DAILY NEWS</p>
                <h1 className={styles.title}>{pageTitle}</h1>
              </div>
              <span className={styles.date}>{formatDate(news.createdDate || date)}</span>
            </header>

            <div className={styles.bodyGrid}>
              <img src={mailImg} alt='' className={styles.decorMailLeft} aria-hidden='true' />
              <img src={mailImg} alt='' className={styles.decorMailRight} aria-hidden='true' />

              <section className={styles.summarySection}>
                <div className={styles.pillLabel}>
                  <Button size='s' typeStyle='type2' type='button' tabIndex={-1}>
                    SOUP 요약
                  </Button>
                </div>
                <div className={styles.summary}>
                  {news.longSummary}
                </div>
              </section>

              {news.articles.length > 0 && (
                <section className={styles.articleSection}>
                  <div className={styles.pillLabel}>
                    <Button size='s' typeStyle='type2' type='button' tabIndex={-1}>
                      관련 기사
                    </Button>
                  </div>
                  <ul className={styles.articleList}>
                    {news.articles.map((article, index) => (
                      <li key={`${article.title}-${index}`} className={styles.article}>
                        <div>
                          <h3 className={styles.articleTitle}>
                            {article.url ? (
                              <a href={article.url} target='_blank' rel='noreferrer'>
                                {article.title}
                              </a>
                            ) : (
                              article.title
                            )}
                          </h3>
                          <p className={styles.articleSummary}>{article.summary}</p>
                        </div>

                        {article.url && (
                          <a className={styles.articleLink} href={article.url} target='_blank' rel='noreferrer'>
                            원문 보기
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {news.relatedKeywords && news.relatedKeywords.length > 0 && (
              <div className={styles.keywordList}>
                {news.relatedKeywords.map((relatedKeyword) => (
                  <span key={relatedKeyword} className={styles.keyword}>
                    {relatedKeyword}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default MailPage
