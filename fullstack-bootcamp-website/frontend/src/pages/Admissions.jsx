import PageHeader  from '../components/ui/PageHeader'
import Pricing     from '../components/Pricing'
import Eligibility from '../components/Eligibility'
import Faq         from '../components/Faq'
import Contact     from '../components/Contact'
import CtaBanner   from '../components/CtaBanner'
import { useSEO }   from '../hooks/useSEO'

export default function Admissions({ onSuccess }) {
  useSEO({
    title: 'Admissions, Fees & EMI Plans in Ahmedabad',
    description: 'Transparent fee structure, no-cost EMI plans and a simple 3-step admission process for the Nirayush EduTech Full Stack Bootcamp. Apply for the founding batch now.',
    keywords: 'bootcamp fee structure, full stack developer course fees, admissions Ahmedabad, tech bootcamp cost',
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
