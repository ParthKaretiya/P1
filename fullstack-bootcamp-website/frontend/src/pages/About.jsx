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
    // → "About Our Coding Bootcamp in Ahmedabad | Nirayush EdTech" (58 chars)
    title: 'About Our Coding Bootcamp in Ahmedabad',
    description: "Learn about Nirayush EdTech — our mission, vision, values and journey to becoming Ahmedabad's most job-focused Full Stack Developer Bootcamp. Visit us today.",
    keywords: 'about Nirayush EdTech, full stack bootcamp history, mission vision',
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
        desc="Nirayush EdTech was founded with one mission — to bridge the gap between education and industry by creating job-ready developers."
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
