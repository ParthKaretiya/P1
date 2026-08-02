import PageHeader   from '../components/ui/PageHeader'
import Testimonials from '../components/Testimonials'
import CtaBanner   from '../components/CtaBanner'
import { useSEO }   from '../hooks/useSEO'

export default function TestimonialsPage() {
  useSEO({
    title: 'Our Commitment & Founding Batch Promise',
    description: "Why Nirayush EduTech built its Full Stack Bootcamp, and the commitments we make to every founding batch student — mentorship, real projects, and dedicated placement support.",
    keywords: 'Nirayush EduTech founding batch, bootcamp commitment Ahmedabad, full stack bootcamp mission',
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
