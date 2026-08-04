import PageHeader from '../components/ui/PageHeader'
import styles     from './LegalPage.module.css'
import { useSEO }  from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

export default function TermsConditions() {
  useSEO({
    title: 'Terms & Conditions',
    description: 'Terms and conditions governing enrolment, attendance, course completion and placement assistance at Nirayush EduTech. Review the full terms before you apply.',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Terms & Conditions' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Legal"
        title="Terms & Conditions"
        accent="Terms & Conditions"
        desc="Last updated: January 2025"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms & Conditions' },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.wrapper}>
            <h2>1. Enrollment & Fee Payment</h2>
            <p>
              Enrollment into Nirayush EduTech bootcamp programs is finalized upon receipt of the initial registration fee. Instalment fees must be cleared on or before the due dates agreed upon during registration.
            </p>

            <h2>2. Attendance & Code of Conduct</h2>
            <p>
              Students are expected to maintain a minimum of 85% attendance across live lectures and practical lab sessions to qualify for capstone project evaluations and placement assistance.
            </p>

            <h2>3. Placement Assistance Policy</h2>
            <p>
              100% Placement Assistance implies dedicated support including resume reviews, mock interviews, and referral submissions to partner firms. Placement outcomes depend on student performance in company interviews and assessments.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              Course materials, project assignments, and lecture notes provided by Nirayush EduTech are for personal learning purposes only and may not be redistributed without written permission.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
