import { SITE_URL, SITE_NAME } from '../hooks/useSEO'

/**
 * Central JSON-LD structured data builders.
 * NOTE: never add aggregateRating / review markup without real, visible reviews —
 * fabricated rating markup is a Google Search Console manual-action risk.
 */

/** EducationalOrganization — used on the homepage. */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  description:
    'Job-focused Full Stack Developer Bootcamp in Ahmedabad with an industry-built 12-month curriculum and dedicated placement support.',
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
    email: 'info@nirayushedutech.com',
    availableLanguage: ['English', 'Hindi', 'Gujarati'],
  },
  // Only real, live profiles belong here — add LinkedIn/YouTube once they exist.
  sameAs: ['https://www.instagram.com/nirayush_edtech/'],
}

/** Course schema for a course-detail page. */
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
    courseCode: course.id,
    educationalLevel: course.level,
    teaches: course.techStack.join(', '),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
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
      courseSchedule: {
        '@type': 'Schedule',
        duration: 'PT2H',
        repeatFrequency: 'Daily',
        repeatCount: 288, // ~48 weeks × 6 days/week
      },
    },
    // Course duration, e.g. "12 Months (48 Weeks)" → ISO 8601
    timeRequired: 'P12M',
  }
}

/** FAQPage schema — pass the same FAQS array that is rendered on the page. */
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
 * BreadcrumbList schema for non-home pages.
 * @param {Array<{label: string, path?: string}>} crumbs — final crumb needs no path.
 */
export function buildBreadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.path ? { item: `${SITE_URL}${c.path}` } : {}),
    })),
  }
}
