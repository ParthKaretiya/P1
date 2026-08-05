import { lazy, Suspense, useEffect, useState } from 'react'
import Hero         from '../components/Hero'
import { useSEO } from '../hooks/useSEO'
import { ORGANIZATION_SCHEMA } from '../data/structuredData'

// ⚠ Mentors section hidden — data was placeholder/fabricated. Re-enable
// ONLY with real, confirmed mentors (see git history for the import).

// Everything below the Hero is code-split so the initial bundle stays lean —
// on a phone viewport only the Hero is visible at first paint, so all other
// sections stream in after the LCP has painted.
const HiringPartners = lazy(() => import('../components/HiringPartners'))
const Ticker         = lazy(() => import('../components/Ticker'))
const WhyUs          = lazy(() => import('../components/WhyUs'))
const HomeCoursesPreview = lazy(() => import('../components/sections/HomeCoursesPreview'))
const Placement    = lazy(() => import('../components/Placement'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const Faq          = lazy(() => import('../components/Faq'))
const Contact      = lazy(() => import('../components/Contact'))
const CtaBanner    = lazy(() => import('../components/CtaBanner'))

// min-height reserves space so lazy sections don't cause layout shift as they
// land — shown both while waiting for first paint (ready=false) and while the
// chunk itself loads (Suspense fallback).
const Placeholder = () => <div style={{ minHeight: 220 }} aria-hidden="true" />
const LazySection = ({ ready = true, children }) => (
  ready
    ? <Suspense fallback={<Placeholder />}>{children}</Suspense>
    : <Placeholder />
)

/* Below-the-fold sections mount only AFTER the first frame has painted
   (double-rAF). Mounting them with the initial render kicks off their chunk
   requests before the Hero paints, which puts ~10 extra requests + their
   execution inside the LCP dependency graph — on a throttled mobile
   connection that's the difference between LCP 1.8s and 5s. */
function useAfterFirstPaint() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let id2 = 0
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setReady(true))
    })
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2) }
  }, [])
  return ready
}

export default function Home({ onSuccess }) {
  const belowFoldReady = useAfterFirstPaint()
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
      <LazySection ready={belowFoldReady}><HiringPartners /></LazySection>
      <LazySection ready={belowFoldReady}><Ticker /></LazySection>
      <LazySection ready={belowFoldReady}><WhyUs /></LazySection>
      <LazySection ready={belowFoldReady}><HomeCoursesPreview /></LazySection>
      <LazySection ready={belowFoldReady}><Placement /></LazySection>
      <LazySection ready={belowFoldReady}><Testimonials /></LazySection>
      <LazySection ready={belowFoldReady}><Faq /></LazySection>
      <LazySection ready={belowFoldReady}><Contact onSuccess={onSuccess} /></LazySection>
      <LazySection ready={belowFoldReady}><CtaBanner /></LazySection>
    </>
  )
}
