import PageHeader from '../components/ui/PageHeader'
import Placement   from '../components/Placement'
import HiringPartners from '../components/HiringPartners'
import CtaBanner   from '../components/CtaBanner'
import CareerRoadmap from '../components/sections/CareerRoadmap'
import { useSEO } from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

export default function Placements() {
  useSEO({
    // → "Placement Support & Career Prep | Nirayush EduTech" (50 chars)
    title: 'Placement Support & Career Prep',
    description: "Dedicated placement support for Nirayush EduTech's founding batch — resume building, mock interviews, portfolio reviews and hiring-network introductions. See how it works.",
    keywords: 'placement support Ahmedabad, full stack developer career prep, bootcamp placement assistance, tech jobs Gujarat',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Placements' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Placement Support"
        title="A Real Process to Get You Job-Ready"
        accent="Job-Ready"
        desc="Our dedicated placement cell works with you from month 9 until you're interview-ready — resume building, mock interviews, portfolio reviews, and introductions to our growing hiring network."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Placements' },
        ]}
      />
      <Placement />
      <HiringPartners />
      <CareerRoadmap />
      <CtaBanner />
    </>
  )
}
