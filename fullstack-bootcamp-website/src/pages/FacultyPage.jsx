import PageHeader from '../components/ui/PageHeader'
import Mentors    from '../components/Mentors'
import CtaBanner  from '../components/CtaBanner'
import { useSEO }  from '../hooks/useSEO'

export default function FacultyPage() {
  useSEO({
    title: 'Our Faculty & Mentors',
    description: 'Meet the industry experts and senior software engineers mentoring students at Nirayush EduTech Full Stack Developer Bootcamp in Ahmedabad.',
    keywords: 'bootcamp instructors, tech mentors Ahmedabad, software engineering faculty, Nirayush EduTech mentors',
  })

  return (
    <>
      <PageHeader
        tag="Expert Mentors"
        title="Learn from Industry Veterans"
        accent="Industry Veterans"
        desc="Our faculty members aren't full-time academics — they are senior software developers and architects with years of production experience."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Faculty' },
        ]}
      />
      <Mentors />
      <CtaBanner />
    </>
  )
}
