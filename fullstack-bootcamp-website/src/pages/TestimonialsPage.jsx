import PageHeader   from '../components/ui/PageHeader'
import Testimonials from '../components/Testimonials'
import CtaBanner   from '../components/CtaBanner'
import { useSEO }   from '../hooks/useSEO'

export default function TestimonialsPage() {
  useSEO({
    title: 'Success Stories & Student Reviews',
    description: "Read inspirational transformation stories from alumni who graduated from Nirayush EduTech's Full Stack Bootcamp and landed top software engineer jobs.",
    keywords: 'student reviews, alumni testimonials, bootcamp success stories Ahmedabad, Nirayush EduTech reviews',
  })

  return (
    <>
      <PageHeader
        tag="Alumni Voices"
        title="Student Success Stories & Reviews"
        accent="Reviews"
        desc="Hear directly from non-coders, career switchers, and fresh graduates who transformed their careers with Nirayush EduTech."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Success Stories' },
        ]}
      />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
