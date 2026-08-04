import { lazy, Suspense } from 'react'
import Hero         from '../components/Hero'
import HiringPartners from '../components/HiringPartners'
import Ticker       from '../components/Ticker'
import WhyUs        from '../components/WhyUs'
// ⚠ Mentors section hidden — data was placeholder/fabricated. Re-enable the
// import and the <Mentors /> element below ONLY with real, confirmed mentors.
// import Mentors      from '../components/Mentors'
import HomeCoursesPreview from '../components/sections/HomeCoursesPreview'
import { useSEO } from '../hooks/useSEO'
import { ORGANIZATION_SCHEMA } from '../data/structuredData'

// Below-the-fold sections are code-split so the initial bundle stays lean —
// they stream in after the Hero (LCP) has painted.
const Placement    = lazy(() => import('../components/Placement'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const Faq          = lazy(() => import('../components/Faq'))
const Contact      = lazy(() => import('../components/Contact'))
const CtaBanner    = lazy(() => import('../components/CtaBanner'))

// min-height reserves space so lazy sections don't cause layout shift as they land
const LazySection = ({ children }) => (
  <Suspense fallback={<div style={{ minHeight: 220 }} aria-hidden="true" />}>{children}</Suspense>
)

export default function Home({ onSuccess }) {
  useSEO({
    // → "Full Stack Development Bootcamp | Nirayush EduTech" (51 chars)
    title: 'Full Stack Development Bootcamp',
    description: 'Job-focused 12-month Full Stack Developer Bootcamp in Ahmedabad. Learn React, Node.js & MongoDB with dedicated placement support — book a free counselling session.',
    keywords: 'full stack bootcamp, developer course, react nodejs, Ahmedabad, Nirayush EduTech',
    // FAQ JSON-LD is injected by the <Faq /> section itself (injectJsonLd)
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
