import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '@/pages/landing'
import { NewsPage } from '@/pages/news'
import { AdminPage } from '@/pages/admin'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route
      path='/news'
      element={
        <NewsPage />
      }
    />

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
