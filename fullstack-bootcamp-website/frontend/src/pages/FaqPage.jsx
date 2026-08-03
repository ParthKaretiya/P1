import PageHeader from '../components/ui/PageHeader'
import Faq        from '../components/Faq'
import CtaBanner  from '../components/CtaBanner'
import { useSEO }  from '../hooks/useSEO'

export default function FaqPage() {
  useSEO({
    title: 'Frequently Asked Questions (FAQ)',
    description: "Find answers to common questions about Nirayush EduTech's Full Stack Bootcamp — eligibility, batch timings, placement assistance, course fees, and laptop requirements.",
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
