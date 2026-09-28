import { useMemo, useState } from 'react'
import { Button } from 'antd'
import { Braces, Check, Copy, FileType, ScanEye } from 'lucide-react'
import { BrandIcon } from './components/BrandIcon'
import { Section } from './components/Section'
import { buildAgentMarkdown } from './data/agentView'
import {
  certifications,
  education,
  experience,
  languages,
  profile,
  projects,
  skills,
  softSkills,
} from './data/cv'
import { heroStack, skillVisuals } from './icons/skills'
import { resolveAppConfig, VIEW_MODES, type ViewMode } from './config'

const accents = {
  tech: '#2563eb',
  profile: '#0d9488',
  experience: '#7c3aed',
  projects: '#d97706',
  education: '#dc2626',
  extra: '#0891b2',
} as const

const stripColors = ['#0078d4', '#512bd4', '#00a8e8', '#2496ed', '#ff6600', '#0d9488']

const pdfName = 'Nguyen Luong Khang - CV.pdf'

const config = resolveAppConfig(import.meta.env)

const modeShort = { human: 'Human', pdf: 'PDF', agent: 'Agent' } as const
const modeLabels = {
  human: 'Human view',
  pdf: 'PDF · raw',
  agent: 'Agent view',
} as const

function nextMode(mode: ViewMode): ViewMode {
  return VIEW_MODES[(VIEW_MODES.indexOf(mode) + 1) % VIEW_MODES.length]
}

function modeIcon(mode: ViewMode, size: number) {
  if (mode === 'pdf') return <FileType size={size} />
  if (mode === 'agent') return <Braces size={size} />
  return <ScanEye size={size} />
}

export default function App() {
  const [mode, setMode] = useState<ViewMode>(config.defaultView)
  const [copied, setCopied] = useState(false)
  const markdown = useMemo(() => buildAgentMarkdown(), [])
  const isPdf = mode === 'pdf'
  const isAgent = mode === 'agent'

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="app">
      <div className="toolbar">
        <span className="view-switch">
          <span className="view-state" aria-live="polite">
            {modeIcon(mode, 13)}
            <span className="view-state-label">{modeLabels[mode]}</span>
          </span>
          <div className="mode-switch" role="group" aria-label="View mode">
            {VIEW_MODES.map((item) => (
              <button
                key={item}
                type="button"
                className={`mode-btn ${mode === item ? 'is-active' : ''}`}
                aria-pressed={mode === item}
                onClick={() => setMode(item)}
              >
                {modeIcon(item, 13)}
                <span>{modeShort[item]}</span>
              </button>
            ))}
          </div>
        </span>
        <button
          type="button"
          className="fab"
          aria-label={`Switch view mode, current ${modeLabels[mode]}`}
          onClick={() => setMode(nextMode(mode))}
        >
          {modeIcon(nextMode(mode), 22)}
        </button>
      </div>

      <div className="stage">
        <div
          className={`layer layer-cv ${mode === 'human' ? 'is-active' : 'is-idle'}`}
          aria-hidden={mode !== 'human'}
        >
        <article className="sheet">
        <header className="masthead">
          <div className="masthead-bar">
            <div className="masthead-row">
              <h1 className="name">{profile.name}</h1>
              <p className="role">{profile.title}</p>
            </div>
            <ul className="contact">
              {profile.contact.map((item) => (
                <li key={item.label}>
                  {'href' in item && item.href ? (
                    <a href={item.href}>{item.value}</a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
            <ul className="hero-stack">
              {heroStack.map((key) => (
                <li key={key} title={skillVisuals[key].icon.split(':')[1]}>
                  <BrandIcon name={key} size={15} />
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="flow">
          <Section title="Career Goals" accent={accents.profile}>
            <p className="summary">{profile.summary}</p>
          </Section>

          <Section title="Tech stack" accent={accents.tech}>
            <div className="stack-grid">
              {skills.map((group) => (
                <div
                  key={group.label}
                  className="stack-card"
                  style={{ '--accent': skillVisuals[group.icon].color } as React.CSSProperties}
                >
                  <h3 className="stack-card-title">
                    <BrandIcon name={group.icon} size={11} className="brand-icon" />
                    {group.label}
                  </h3>
                  <ul className="chips">
                    {group.items.map((item) => (
                      <li
                        key={item.label}
                        className="chip"
                        style={{ '--brand': skillVisuals[item.icon].color } as React.CSSProperties}
                      >
                        <BrandIcon name={item.icon} size={9} className="chip-icon brand-icon" />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Experience" accent={accents.experience}>
            <div className="stack ruled">
              {experience.map((role, index) => (
                <div
                  key={role.company}
                  className="entry job"
                  style={{ '--accent': accents.experience } as React.CSSProperties}
                >
                  <div className="entry-head">
                    <h3 className="entry-title strong">
                      <span className="job-dot" />
                      {role.company}
                      <span className="entry-role"> — {role.position}</span>
                      {index === 0 ? <span className="badge">current</span> : null}
                    </h3>
                    <span className="period">
                      {role.period}
                      {role.context ? ` · ${role.context}` : ''}
                    </span>
                  </div>
                  <ul className="bullets">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Projects" accent={accents.projects}>
            <div className="project-grid">
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  className="entry project-card"
                  style={{ '--accent': stripColors[index % stripColors.length] } as React.CSSProperties}
                >
                  <h3 className="entry-title strong">
                    {project.name}
                    <span className="tag">{project.note}</span>
                  </h3>
                  <p className="entry-body">{project.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Background" accent={accents.education}>
            <div className="split-footer">
              <div>
              <h3 className="mini-title">Education</h3>
              {education.map((item) => (
                <div key={item.school} className="entry">
                  <p className="entry-title strong">{item.school}</p>
                  <p className="entry-meta">
                    {item.degree} · {item.period}
                  </p>
                  <p className="entry-note">{item.note}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="mini-title">Certifications</h3>
              <ul className="stack">
                  {certifications.map((item) => (
                    <li key={item.name} className="entry">
                      <p className="entry-title">
                        <a
                          className="cert-link"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {item.name}
                        </a>
                      </p>
                      <p className="entry-meta">
                        {item.issuer} · {item.date}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h3 className="mini-title">Soft skills</h3>
              <ul className="stack">
                {softSkills.map((item) => (
                  <li key={item} className="entry">
                    <p className="entry-title">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mini-title">Languages</h3>
              <ul className="stack">
                {languages.map((item) => (
                  <li key={item.name} className="entry">
                    <p className="entry-title">{item.name}</p>
                    <p className="entry-meta">
                      {item.level}
                      {item.note ? ` — ${item.note}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </Section>
        </div>
        </article>
        </div>

        <div
          className={`layer layer-pdf ${isPdf ? 'is-active' : 'is-idle'}`}
          aria-hidden={!isPdf}
        >
          <div className="pdf-panel">
            <div className="pdf-bar">
              <span className="pdf-name">{pdfName}</span>
              <span className="pdf-bar-actions">
                <a className="pdf-link" href={`/${config.pdfFile}`} download={pdfName}>
                  Download
                </a>
                <a
                  className="pdf-link"
                  href={`/${config.pdfFile}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open in new tab
                </a>
              </span>
            </div>
            <iframe
              className="pdf-frame"
              src={`/${config.pdfFile}#view=FitH`}
              title="Curriculum Vitae (PDF)"
            />
          </div>
        </div>

        <div
          className={`layer layer-agent ${isAgent ? 'is-active' : 'is-idle'}`}
          aria-hidden={!isAgent}
        >
          <div className="agent-panel">
            <div className="agent-bar">
              <span className="agent-title">
                {modeIcon('agent', 13)}
                Plain-text CV · markdown
              </span>
              <span className="agent-bar-actions">
                <Button
                  size="small"
                  icon={copied ? <Check size={13} /> : <Copy size={13} />}
                  onClick={copyMarkdown}
                >
                  {copied ? 'Copied' : 'Copy markdown'}
                </Button>
                <a className="pdf-link" href={`/${config.pdfFile}`} download={pdfName}>
                  Download PDF
                </a>
                <a
                  className="pdf-link"
                  href={`/${config.agentFile}`}
                  download={config.agentFile}
                >
                  Download {config.agentFile}
                </a>
              </span>
            </div>
            <pre className="agent-doc">{markdown}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
