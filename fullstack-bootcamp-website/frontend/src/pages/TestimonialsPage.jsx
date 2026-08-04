import PageHeader   from '../components/ui/PageHeader'
import Testimonials from '../components/Testimonials'
import CtaBanner   from '../components/CtaBanner'
import { useSEO }   from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

export default function TestimonialsPage() {
  useSEO({
    // → "Our Founding Batch Commitment | Nirayush EduTech" (48 chars)
    title: 'Our Founding Batch Commitment',
    description: 'Why Nirayush EduTech built its Full Stack Bootcamp, and the commitments we make to every founding batch student — mentorship, real projects and placement support.',
    keywords: 'Nirayush EduTech founding batch, bootcamp commitment Ahmedabad, full stack bootcamp mission',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Our Commitment' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Our Commitment"
        title="Why We Built This Program"
        accent="This Program"
        desc="We're launching our founding batch — here's what we stand for, and the promises you can hold us to."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Commitment' },
        ]}
      />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
