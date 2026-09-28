import {
  certifications,
  education,
  experience,
  languages,
  profile,
  projects,
  skills,
  softSkills,
} from './cv'

export function buildAgentMarkdown(): string {
  const lines: string[] = []

  lines.push(`# ${profile.name}`)
  lines.push(profile.title)
  for (const item of profile.contact) {
    lines.push(`- ${item.label}: ${item.value}`)
  }

  lines.push('', '## Career Goals', profile.summary)

  lines.push('', '## Tech stack')
  for (const group of skills) {
    lines.push(`### ${group.label}`)
    lines.push(group.items.map((item) => item.label).join(', '))
  }

  lines.push('', '## Experience')
  for (const role of experience) {
    lines.push(
      `### ${role.company} — ${role.position}`,
      `${role.period}${role.context ? ` | ${role.context}` : ''}`,
    )
    for (const bullet of role.bullets) {
      lines.push(`- ${bullet}`)
    }
    lines.push('')
  }

  lines.push('## Projects')
  for (const project of projects) {
    lines.push(`### ${project.name} (${project.note})`, project.description, '')
  }

  lines.push('## Background')
  lines.push('### Education')
  for (const item of education) {
    lines.push(
      `#### ${item.school} — ${item.degree}`,
      `${item.period}${item.note ? ` | ${item.note}` : ''}`,
    )
  }

  lines.push('', '### Certifications')
  for (const item of certifications) {
    lines.push(`- ${item.name} — ${item.issuer}, ${item.date} — ${item.url}`)
  }

  lines.push('', '### Soft skills')
  lines.push(softSkills.join(', '))

  lines.push('', '### Languages')
  for (const item of languages) {
    lines.push(
      `- ${item.name} — ${item.level}${item.note ? ` (${item.note})` : ''}`,
    )
  }

  return `${lines.join('\n').trim()}\n`
}

export function buildPersonJsonLd(siteUrl: string): string {
  const contact = Object.fromEntries(
    profile.contact.map((item) => [item.label.toLowerCase(), item.value]),
  )

  const person: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    email: contact.email,
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hanoi',
      addressCountry: 'VN',
    },
    knowsLanguage: languages.map((item) => item.name),
    alumniOf: education.map((item) => ({
      '@type': 'CollegeOrUniversity',
      name: item.school,
    })),
    knowsAbout: [
      ...skills.flatMap((group) => group.items.map((item) => item.label)),
      ...softSkills,
    ],
    hasCredential: certifications.map((item) => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.name,
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: item.issuer },
      url: item.url,
    })),
    hasOccupation: experience.map((role) => ({
      '@type': 'Occupation',
      title: role.position,
      worksFor: { '@type': 'Organization', name: role.company },
    })),
  }

  if (siteUrl) {
    person.url = siteUrl
    person.mainEntityOfPage = siteUrl
  }

  return JSON.stringify(person, null, 2)
}
