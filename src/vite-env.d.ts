/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical URL, dung cho JSON-LD va duong dan share. De trong = bo qua field url. */
  readonly VITE_SITE_URL?: string
  /** Mode mo khi load: human | pdf | agent. Mac dinh pdf. */
  readonly VITE_DEFAULT_VIEW?: string
  /** Ten file raw PDF trong public/, dung cho iframe + download. Mac dinh cv.pdf */
  readonly VITE_PDF_FILE?: string
  /** Ten file markdown agent, dung cho download + duong dan fetch. Mac dinh cv.md */
  readonly VITE_AGENT_FILE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
