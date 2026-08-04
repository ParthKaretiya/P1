import { lazy, Suspense } from 'react'
import Hero         from '../components/Hero'
import HiringPartners from '../components/HiringPartners'
import Ticker       from '../components/Ticker'
import WhyUs        from '../components/WhyUs'
import HomeCoursesPreview from '../components/sections/HomeCoursesPreview'
import { useSEO } from '../hooks/useSEO'
import { ORGANIZATION_SCHEMA } from '../data/schema'

const Placement    = lazy(() => import('../components/Placement'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const Faq          = lazy(() => import('../components/Faq'))
const Contact      = lazy(() => import('../components/Contact'))
const CtaBanner    = lazy(() => import('../components/CtaBanner'))

const LazySection = ({ children }) => (
  <Suspense fallback={<div style={{ minHeight: 220 }} aria-hidden="true" />}>{children}</Suspense>
)

export default function Home({ onSuccess }) {
  useSEO({
    title: 'Full Stack Development Bootcamp | Nirayush EduTech',
    description: 'Job-focused 12-month Full Stack Developer Bootcamp in Ahmedabad. Learn React, Node.js & MongoDB with placement support — book a free counselling session today.',
    keywords: 'full stack bootcamp, developer course, react nodejs, Ahmedabad, Nirayush EduTech',
    jsonLd: ORGANIZATION_SCHEMA,
  })

  return (
    <>
      <Hero />
      <HiringPartners />
      <Ticker />
      <WhyUs />
      <HomeCoursesPreview />
      <LazySection><Placement /></LazySection>
      <LazySection><Testimonials /></LazySection>
      <LazySection><Faq /></LazySection>
      <LazySection><Contact onSuccess={onSuccess} /></LazySection>
      <LazySection><CtaBanner /></LazySection>
    </>
  )
}
