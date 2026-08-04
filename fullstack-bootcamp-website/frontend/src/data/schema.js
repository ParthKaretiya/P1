import { SITE_URL, SITE_NAME } from '../hooks/useSEO'

/**
 * Shared schema.org JSON-LD builders.
 * IMPORTANT: keep every value here consistent with the visible page content —
 * mismatched structured data risks Google Search Console penalties.
 * No aggregateRating / review markup until real, verifiable reviews exist.
 */

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    'Job-focused Full Stack Developer Bootcamp in Ahmedabad. Industry-built 12-month MERN curriculum with dedicated placement support.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Skyleaf, Shop No. 01, Near Sardardham, Khodiyar',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382421',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-90541-17266',
    contactType: 'admissions',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'gu'],
  },
  // sameAs: add real social profile URLs here once they exist
  // (footer currently has placeholder "#" links — do not fabricate).
}

/** Course schema for a course from coursesData.js. */
export function buildCourseSchema(course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.desc,
    url: `${SITE_URL}/courses/${course.id}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      courseWorkload: 'PT12H',
      location: {
        '@type': 'Place',
        name: `${SITE_NAME}, Ahmedabad`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
      },
    },
    timeRequired: 'P12M',
  }
}

/** FAQPage schema — `faqs` must be the exact visible question/answer pairs. */
export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/**
 * BreadcrumbList schema from PageHeader-style crumbs:
 * [{ label: 'Home', href: '/' }, { label: 'About Us' }]
 */
export function buildBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}` } : {}),
    })),
  }
}
