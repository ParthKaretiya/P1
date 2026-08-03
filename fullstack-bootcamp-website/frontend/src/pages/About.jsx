import PageHeader    from '../components/ui/PageHeader'
import WhyUs         from '../components/WhyUs'
import CtaBanner     from '../components/CtaBanner'
import AboutStory    from '../components/sections/AboutStory'
import VisionValues  from '../components/sections/VisionValues'
import JourneyTimeline from '../components/sections/JourneyTimeline'
import { useSEO } from '../hooks/useSEO'

export default function About() {
  useSEO({
    title: 'About Us',
    description: "Learn about Nirayush EduTech — our mission, vision, values, and journey to becoming Ahmedabad's premier Full Stack Developer Bootcamp.",
    keywords: 'about Nirayush EduTech, full stack bootcamp history, mission vision',
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
