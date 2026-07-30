import { useEffect } from 'react'
import Hero         from '../components/Hero'
import HiringPartners from '../components/HiringPartners'
import Ticker       from '../components/Ticker'
import WhyUs        from '../components/WhyUs'
import Mentors      from '../components/Mentors'
import Placement    from '../components/Placement'
import Testimonials from '../components/Testimonials'
import Faq          from '../components/Faq'
import Contact      from '../components/Contact'
import CtaBanner    from '../components/CtaBanner'
import HomeCoursesPreview from '../components/sections/HomeCoursesPreview'
import { useSEO } from '../hooks/useSEO'

export default function Home({ onSuccess }) {
  useSEO({
    title: 'Full Stack Developer Bootcamp — Ahmedabad',
    description: '12-Month industry-ready Full Stack Developer Bootcamp by Nirayush EduTech. Learn React, Node.js, MongoDB, and more with 100% Placement Assistance in Ahmedabad.',
    keywords: 'full stack bootcamp, developer course, react nodejs, Ahmedabad, Nirayush EduTech',
  })

  return (
    <>
      <Hero />
      <HiringPartners />
      <Ticker />
      <WhyUs />
      <HomeCoursesPreview />
      <Mentors />
      <Placement />
      <Testimonials />
      <Faq />
      <Contact onSuccess={onSuccess} />
      <CtaBanner />
    </>
  )
}
