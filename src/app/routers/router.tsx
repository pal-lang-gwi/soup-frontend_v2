import { Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/pages/landing'
import { HomePage } from '@/pages/home'
import { NewsPage } from '@/pages/news'
import { AdminPage } from '@/pages/admin'

// import { AuthGuard, AdminGuard, AdditionalInfoGuard } from '@/routes/guards';
// import { MainLayout } from '@/routes/layouts/MainLayout';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />

    {/* 로그인 후 접근 가능 페이지 */}
    <Route path='/home' element={<HomePage />} />
    <Route path='/news' element={<NewsPage />} />

    {/* 관리자 페이지 */}
    <Route path='/admin' element={<AdminPage />} />
  </Routes>
)

export default AppRoutes
