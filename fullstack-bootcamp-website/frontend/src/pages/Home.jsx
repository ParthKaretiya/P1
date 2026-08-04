import { useEffect } from 'react'
import Hero         from '../components/Hero'
import HiringPartners from '../components/HiringPartners'
import Ticker       from '../components/Ticker'
import WhyUs        from '../components/WhyUs'
// ⚠ Mentors section hidden — data was placeholder/fabricated. Re-enable the
// import and the <Mentors /> element below ONLY with real, confirmed mentors.
// import Mentors      from '../components/Mentors'
import Placement    from '../components/Placement'
import Testimonials from '../components/Testimonials'
import Faq, { FAQS } from '../components/Faq'
import Contact      from '../components/Contact'
import CtaBanner    from '../components/CtaBanner'
import HomeCoursesPreview from '../components/sections/HomeCoursesPreview'
import { useSEO } from '../hooks/useSEO'
import { ORGANIZATION_SCHEMA, buildFaqSchema } from '../data/structuredData'

export default function Home({ onSuccess }) {
  useSEO({
    // → "Full Stack Development Bootcamp | Nirayush EduTech" (51 chars)
    title: 'Full Stack Development Bootcamp',
    description: 'Job-focused 12-month Full Stack Developer Bootcamp in Ahmedabad. Learn React, Node.js & MongoDB with dedicated placement support — book a free counselling session.',
    keywords: 'full stack bootcamp, developer course, react nodejs, Ahmedabad, Nirayush EduTech',
    // FAQ schema matches the visible <Faq /> section rendered below
    jsonLd: [ORGANIZATION_SCHEMA, buildFaqSchema(FAQS)],
  })

  return (
    <>
      <Hero />
      <HiringPartners />
      <Ticker />
      <WhyUs />
      <HomeCoursesPreview />
      {/* <Mentors /> — hidden until real mentor lineup is confirmed */}
      <Placement />
      <Testimonials />
      <Faq />
      <Contact onSuccess={onSuccess} />
      <CtaBanner />
    </>
  )
}
