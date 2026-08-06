import PageHeader from '../components/ui/PageHeader'
import Faq, { FAQS } from '../components/Faq'
import CtaBanner  from '../components/CtaBanner'
import { useSEO }  from '../hooks/useSEO'
import { buildFaqSchema, buildBreadcrumbSchema } from '../data/structuredData'

export default function FaqPage() {
  useSEO({
    // → "Bootcamp FAQ — Fees, Batches & Placements | Nirayush EdTech"
    title: 'Bootcamp FAQ — Fees, Batches & Placements',
    description: "Answers to common questions about Nirayush EdTech's Full Stack Bootcamp — eligibility, batch timings, fees, EMI, refunds and placement support. Get clarity before you apply.",
    keywords: 'bootcamp FAQ, coding bootcamp questions, placement policy Ahmedabad, course eligibility',
    jsonLd: [
      buildFaqSchema(FAQS),
      buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'FAQ' },
      ]),
    ],
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
