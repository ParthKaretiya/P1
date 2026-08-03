import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import Toast           from './components/Toast'
import BackToTop       from './components/BackToTop'
import ScrollToTop     from './components/layout/ScrollToTop'
import ScrollProgress  from './components/layout/ScrollProgress'
import PageTransition  from './components/layout/PageTransition'
import SmoothScroll    from './components/layout/SmoothScroll'
import './App.css'

// Lazy loaded page components for optimal performance & code splitting
const Home           = lazy(() => import('./pages/Home'))
const About          = lazy(() => import('./pages/About'))
const Courses        = lazy(() => import('./pages/Courses'))
const CourseDetail   = lazy(() => import('./pages/CourseDetail'))
const Placements     = lazy(() => import('./pages/Placements'))
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'))
// ⚠ FacultyPage hidden — placeholder mentor data. Restore with the /mentors route.
// const FacultyPage    = lazy(() => import('./pages/FacultyPage'))
const Admissions     = lazy(() => import('./pages/Admissions'))
const ContactPage    = lazy(() => import('./pages/ContactPage'))
const Gallery        = lazy(() => import('./pages/Gallery'))
const FaqPage        = lazy(() => import('./pages/FaqPage'))
const Blog           = lazy(() => import('./pages/Blog'))
const BlogPost       = lazy(() => import('./pages/BlogPost'))
const PrivacyPolicy  = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const NotFound       = lazy(() => import('./pages/NotFound'))

// Suspense Fallback Loader
function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--off-white)',
    }}>
      <div style={{
        width: 48,
        height: 48,
        border: '3px solid var(--gray-200)',
        borderTopColor: 'var(--orange-deep)',
        borderRadius: '50%',
        animation: 'spin .8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function AnimatedRoutes({ showToast }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home onSuccess={showToast} /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
        <Route path="/courses/:courseId" element={<PageTransition><CourseDetail onSuccess={showToast} /></PageTransition>} />
        <Route path="/placements" element={<PageTransition><Placements /></PageTransition>} />
        <Route path="/testimonials" element={<PageTransition><TestimonialsPage /></PageTransition>} />
        {/* ⚠ /mentors hidden — FacultyPage shows placeholder mentors. Restore this
            route (and the Navbar/Footer/Home references) once real mentors are confirmed. */}
        <Route path="/mentors" element={<Navigate to="/about" replace />} />
        <Route path="/admissions" element={<PageTransition><Admissions onSuccess={showToast} /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage onSuccess={showToast} /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsConditions /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [toast, setToast] = useState({ show: false, message: '' })

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 4500)
  }

  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <ScrollProgress />
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes showToast={showToast} />
          </Suspense>
        </main>
        <Footer />
        <Toast show={toast.show} message={toast.message} />
        <BackToTop />
      </SmoothScroll>
    </BrowserRouter>
  )
}
