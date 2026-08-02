import PageHeader from '../components/ui/PageHeader'
import Placement   from '../components/Placement'
import HiringPartners from '../components/HiringPartners'
import CtaBanner   from '../components/CtaBanner'
import CareerRoadmap from '../components/sections/CareerRoadmap'
import { useSEO } from '../hooks/useSEO'

export default function Placements() {
  useSEO({
    title: 'Placement Support & Career Preparation',
    description: "Dedicated placement support for Nirayush EduTech's founding batch — resume building, mock interviews, portfolio reviews, and introductions to our growing hiring network.",
    keywords: 'placement support Ahmedabad, full stack developer career prep, bootcamp placement assistance, tech jobs Gujarat',
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
