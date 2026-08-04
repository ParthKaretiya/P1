import PageHeader  from '../components/ui/PageHeader'
import Pricing     from '../components/Pricing'
import Eligibility from '../components/Eligibility'
import Faq         from '../components/Faq'
import Contact     from '../components/Contact'
import CtaBanner   from '../components/CtaBanner'
import { useSEO }   from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

export default function Admissions({ onSuccess }) {
  useSEO({
    // → "Admissions, Fees & EMI Plans | Nirayush EduTech" (47 chars)
    title: 'Admissions, Fees & EMI Plans',
    description: 'Transparent fee structure, no-cost EMI plans and a simple admission process for the Full Stack Bootcamp in Ahmedabad. Check eligibility and apply for the founding batch.',
    keywords: 'bootcamp fee structure, full stack developer course fees, admissions Ahmedabad, tech bootcamp cost',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Admissions' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Admissions"
        title="Investment in Your Tech Future"
        accent="Tech Future"
        desc="Transparent fee structure, zero hidden costs, flexible EMI options, and dedicated placement support. Your launchpad to a high-growth tech career."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Admissions' },
        ]}
      />
      <Pricing onSuccess={onSuccess} />
      <Eligibility />
      <Faq />
      <Contact onSuccess={onSuccess} />
      <CtaBanner />
    </>
  )
}
