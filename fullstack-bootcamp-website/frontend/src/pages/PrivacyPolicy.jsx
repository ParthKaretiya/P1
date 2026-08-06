import PageHeader from '../components/ui/PageHeader'
import styles     from './LegalPage.module.css'
import { useSEO }  from '../hooks/useSEO'
import { buildBreadcrumbSchema } from '../data/structuredData'

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy',
    description: 'How Nirayush EdTech collects, uses and protects the personal data of student applicants and website visitors. Read our full privacy policy and data terms.',
    jsonLd: buildBreadcrumbSchema([
      { label: 'Home', path: '/' },
      { label: 'Privacy Policy' },
    ]),
  })

  return (
    <>
      <PageHeader
        tag="Legal"
        title="Privacy Policy"
        accent="Privacy Policy"
        desc="Last updated: January 2025"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.wrapper}>
            <h2>1. Information We Collect</h2>
            <p>
              When you submit a contact form, request course information, or enroll in Nirayush EdTech's bootcamp programs, we collect personal information such as your name, phone number, email address, educational background, and city of residence.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the collected information solely to provide academic counselling, schedule demo classes, send course syllabus materials, communicate batch updates, and facilitate placement support services with partner companies.
            </p>

            <h2>3. Information Sharing & Third Parties</h2>
            <p>
              Nirayush EdTech does not sell, rent, or trade your personal information to third-party marketers. Student placement resumes are shared with verified hiring partners strictly with student consent during placement drives.
            </p>

            <h2>4. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact us at info@nirayushedtech.com or +91 90541 17266.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
