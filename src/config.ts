export const VIEW_MODES = ['human', 'pdf', 'agent'] as const

export type ViewMode = (typeof VIEW_MODES)[number]

export type AppConfig = {
  siteUrl: string
  defaultView: ViewMode
  pdfFile: string
  agentFile: string
}

const DEFAULTS: AppConfig = {
  siteUrl: '',
  defaultView: 'pdf',
  pdfFile: 'cv.pdf',
  agentFile: 'cv.md',
}

type Env = Record<string, string | boolean | undefined>

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function resolveAppConfig(env: Env): AppConfig {
  const siteUrl = text(env.VITE_SITE_URL).replace(/\/+$/, '')
  const requestedView = text(env.VITE_DEFAULT_VIEW).toLowerCase()

  if (requestedView && !(VIEW_MODES as readonly string[]).includes(requestedView)) {
    console.warn(
      `[config] VITE_DEFAULT_VIEW="${requestedView}" khong hop le, dung "${DEFAULTS.defaultView}".`,
    )
  }

  return {
    siteUrl,
    defaultView: (VIEW_MODES as readonly string[]).includes(requestedView)
      ? (requestedView as ViewMode)
      : DEFAULTS.defaultView,
    pdfFile: text(env.VITE_PDF_FILE) || DEFAULTS.pdfFile,
    agentFile: text(env.VITE_AGENT_FILE) || DEFAULTS.agentFile,
  }
}
