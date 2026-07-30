import PageHeader from '../components/ui/PageHeader'
import Placement   from '../components/Placement'
import HiringPartners from '../components/HiringPartners'
import CtaBanner   from '../components/CtaBanner'
import CareerRoadmap from '../components/sections/CareerRoadmap'
import { useSEO } from '../hooks/useSEO'

export default function Placements() {
  useSEO({
    title: 'Placements & Career Outcomes',
    description: "500+ students placed with 100% placement assistance. View Nirayush EduTech's placement statistics, hiring partners, and average packages of ₹4–8 LPA.",
    keywords: 'placements Ahmedabad, full stack developer placement, 100% placement bootcamp, tech jobs Gujarat',
  })

  return (
    <>
      <PageHeader
        tag="Placement Success"
        title="Real Careers, Real Companies, Real Packages"
        accent="Real Companies"
        desc="Our dedicated placement cell works with you from month 9 until you receive your first offer letter. 100% placement assistance — not just a promise, a process."
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
