import PageHeader from '../components/ui/PageHeader'
import Faq        from '../components/Faq'
import CtaBanner  from '../components/CtaBanner'
import { useSEO }  from '../hooks/useSEO'

export default function FaqPage() {
  useSEO({
    title: 'Bootcamp FAQ — Fees, Batches & Placements',
    description: 'Answers on eligibility, batch timings, placement help, fees, EMI and laptop requirements for the Nirayush EduTech Full Stack Bootcamp. Get your questions resolved.',
    keywords: 'bootcamp FAQ, coding bootcamp questions, placement policy Ahmedabad, course eligibility',
  })

  return (
    <>
      <PageHeader
        tag="Help Center"
        title="Frequently Asked Questions"
        accent="Questions"
        desc="Everything you need to know about our admissions, curriculum, batch schedules, fees, and placement support."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'FAQ' },
        ]}
      />
      <Faq />
      <CtaBanner />
    </>
  )
}
