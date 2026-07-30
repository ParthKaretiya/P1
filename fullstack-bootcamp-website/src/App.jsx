import { useState } from 'react'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import HiringPartners from './components/HiringPartners'
import Ticker       from './components/Ticker'
import WhyUs        from './components/WhyUs'
import Eligibility  from './components/Eligibility'
import Curriculum   from './components/Curriculum'
import Mentors      from './components/Mentors'
import Placement    from './components/Placement'
import Pricing      from './components/Pricing'
import Testimonials from './components/Testimonials'
import Faq          from './components/Faq'
import Contact      from './components/Contact'
import CtaBanner    from './components/CtaBanner'
import Footer       from './components/Footer'
import Toast       from './components/Toast'
import BackToTop   from './components/BackToTop'
import './App.css'

function App() {
  const [toast, setToast] = useState({ show: false, message: '' })

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 4500)
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HiringPartners />
        <Ticker />
        <WhyUs />
        <Eligibility />
        <Curriculum />
        <Mentors />
        <Placement />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact onSuccess={showToast} />
        <CtaBanner />
      </main>
      <Footer />
      <Toast show={toast.show} message={toast.message} />
      <BackToTop />
    </>
  )
}

export default App
