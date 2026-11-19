import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import ProviderProfilePage from './pages/ProviderProfilePage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'
import AboutPage from './pages/AboutPage'
import EmptyState from './components/EmptyState'

function NotFoundPage() {
  return (
    <div className="container-content py-16">
      <EmptyState
        title="পাতাটি পাওয়া যায়নি"
        description="আপনি যে ঠিকানায় যেতে চেয়েছেন তা নেই। হোমপেজে ফিরে আবার চেষ্টা করুন।"
        action={<Link to="/" className="btn-primary">হোমপেজে ফিরুন</Link>}
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ExplorePage />} />
            <Route path="/provider/:id" element={<ProviderProfilePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
