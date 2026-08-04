import PageHeader    from '../components/ui/PageHeader'
import WhyUs         from '../components/WhyUs'
import CtaBanner     from '../components/CtaBanner'
import AboutStory    from '../components/sections/AboutStory'
import VisionValues  from '../components/sections/VisionValues'
import JourneyTimeline from '../components/sections/JourneyTimeline'
import { useSEO } from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

export default function About() {
  useSEO({
<<<<<<< HEAD
    // → "About Our Coding Bootcamp in Ahmedabad | Nirayush EduTech" (58 chars)
    title: 'About Our Coding Bootcamp in Ahmedabad',
    description: "Learn about Nirayush EduTech — our mission, vision, values and journey to becoming Ahmedabad's most job-focused Full Stack Developer Bootcamp. Visit us today.",
=======
    title: 'About Our Coding Bootcamp in Ahmedabad',
    description: "Discover Nirayush EduTech's mission, vision, and journey to becoming Ahmedabad's premier Full Stack Developer Bootcamp. Meet the team — book a free visit today.",
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
    keywords: 'about Nirayush EduTech, full stack bootcamp history, mission vision',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'About' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Our Story"
        title="Building Careers, Changing Lives"
        accent="Changing Lives"
        desc="Nirayush EduTech was founded with one mission — to bridge the gap between education and industry by creating job-ready developers."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />
      <AboutStory />
      <VisionValues />
      <WhyUs />
      <JourneyTimeline />
      <CtaBanner />
    </>
  )
}
