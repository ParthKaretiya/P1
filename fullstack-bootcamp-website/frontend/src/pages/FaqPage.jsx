import PageHeader from '../components/ui/PageHeader'
import Faq, { FAQS } from '../components/Faq'
import CtaBanner  from '../components/CtaBanner'
import { useSEO }  from '../hooks/useSEO'
import { buildFaqSchema, buildBreadcrumbSchema } from '../data/structuredData'

export default function FaqPage() {
  useSEO({
<<<<<<< HEAD
    // → "Bootcamp FAQ — Fees, Batches & Placements | Nirayush EduTech"
    title: 'Bootcamp FAQ — Fees, Batches & Placements',
    description: "Answers to common questions about Nirayush EduTech's Full Stack Bootcamp — eligibility, batch timings, fees, EMI, refunds and placement support. Get clarity before you apply.",
=======
    title: 'Bootcamp FAQ — Fees, Batches & Placements',
    description: 'Answers on eligibility, batch timings, placement help, fees, EMI and laptop requirements for the Nirayush EduTech Full Stack Bootcamp. Get your questions resolved.',
>>>>>>> 14207f4ce7ff4fcace3e01b39d2548e43aa8799e
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
