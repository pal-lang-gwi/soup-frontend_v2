import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '@/pages/landing'
import { HomePage } from '@/pages/home'
import { NewsPage } from '@/pages/news'
import { AdminPage } from '@/pages/admin'
import { MyPage } from '@/pages/mypage'
import { useState, useEffect } from 'react'
import { getUser } from '@/entities/user/api/getUser'
import mailImg from '@/shared/assets/mail.png'

const IndexRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    getUser()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
  },[])

  if (isLoggedIn === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={mailImg} alt="로딩중" style={{ width: '150px' }} />
      </div>
    )
  }

  // 로그인 상태에 따라 렌더링
  return isLoggedIn ? <HomePage /> : <LandingPage />
}

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<IndexRoute />} />
    <Route
      path='/news'
      element={
        <NewsPage />
      }
    />

    {/* 로그인 후 접근 가능 페이지 */}
    <Route path='/home' element={<HomePage />} />
    <Route path='/news' element={<NewsPage />} />
    <Route path='/mypage' element={<MyPage />} />
    <Route
      path='/admin'
      element={
        <AdminPage />
      }
    />

    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes>
)

export default AppRoutes
