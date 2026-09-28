import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { buildAgentMarkdown, buildPersonJsonLd } from './src/data/agentView'
import { resolveAppConfig, type AppConfig } from './src/config'

function agentAssets(config: AppConfig): Plugin {
  const agentPath = `/${config.agentFile}`

  const headTags = (): HtmlTagDescriptor[] => {
    const tags: HtmlTagDescriptor[] = [
      {
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: buildPersonJsonLd(config.siteUrl),
        injectTo: 'head',
      },
    ]

    if (config.siteUrl) {
      tags.unshift(
        { tag: 'link', attrs: { rel: 'canonical', href: config.siteUrl }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: config.siteUrl }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:type', content: 'profile' }, injectTo: 'head' },
      )
    }

    return tags
  }

  return {
    name: 'agent-assets',
    configureServer(server) {
      server.middlewares.use(agentPath, (_request, response) => {
        response.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        response.end(buildAgentMarkdown())
      })
    },
    transformIndexHtml: {
      order: 'pre',
      handler: () => headTags(),
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: config.agentFile,
        source: buildAgentMarkdown(),
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const config = resolveAppConfig(loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), agentAssets(config)],
    server: { port: 5173 },
  }
})
