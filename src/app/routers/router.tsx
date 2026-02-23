import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '@/pages/landing'
import { HomePage } from '@/pages/home'
import { NewsPage } from '@/pages/news'
import { AdminPage } from '@/pages/admin'
// import { AdditionalInfoGuard } from '@/features/auth'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route
      path='/home'
      element={
        // <AdditionalInfoGuard>
        <HomePage />
        // </AdditionalInfoGuard>
      }
    />

    <Route
      path='/news'
      element={
        // <AdditionalInfoGuard>
        <NewsPage />
        // </AdditionalInfoGuard>
      }
    />

    <Route
      path='/admin'
      element={
        // <AdditionalInfoGuard>
        <AdminPage />
        // </AdditionalInfoGuard>
      }
    />

    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes>
)

export default AppRoutes
