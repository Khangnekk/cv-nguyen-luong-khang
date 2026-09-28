export type IconKey =
  | 'csharp'
  | 'dotnet'
  | 'efcore'
  | 'react'
  | 'typescript'
  | 'vite'
  | 'windows'
  | 'unity'
  | 'openapi'
  | 'sqlserver'
  | 'postgresql'
  | 'mongodb'
  | 'schema'
  | 'microservices'
  | 'cqrs'
  | 'clean'
  | 'solid'
  | 'patterns'
  | 'rabbitmq'
  | 'redis'
  | 'docker'
  | 'iis'
  | 'linux'
  | 'nginx'
  | 'aws'
  | 'azuredevops'
  | 'cicd'
  | 'langgraph'
  | 'langchain'
  | 'harness'
  | 'claudecode'
  | 'git'

type SkillVisual = {
  icon: string
  color: string
}

export const skillVisuals: Record<IconKey, SkillVisual> = {
  csharp: { icon: 'devicon:csharp', color: '#68217a' },
  dotnet: { icon: 'devicon:dotnetcore', color: '#512bd4' },
  efcore: { icon: 'devicon:entityframeworkcore', color: '#512bd4' },
  react: { icon: 'devicon:react', color: '#00a8e8' },
  typescript: { icon: 'devicon:typescript', color: '#3178c6' },
  vite: { icon: 'devicon:vite', color: '#646cff' },
  windows: { icon: 'devicon:windows11', color: '#0078d4' },
  unity: { icon: 'devicon:unity', color: '#222c37' },
  openapi: { icon: 'devicon:openapi', color: '#6ba539' },
  sqlserver: { icon: 'devicon:microsoftsqlserver', color: '#cc2927' },
  postgresql: { icon: 'devicon:postgresql', color: '#336791' },
  mongodb: { icon: 'devicon:mongodb', color: '#47a248' },
  schema: { icon: 'lucide:database', color: '#0e7490' },
  microservices: { icon: 'lucide:boxes', color: '#326ce5' },
  cqrs: { icon: 'lucide:split', color: '#7c3aed' },
  clean: { icon: 'lucide:layers', color: '#0891b2' },
  solid: { icon: 'lucide:shield-check', color: '#0d9488' },
  patterns: { icon: 'lucide:workflow', color: '#d97706' },
  rabbitmq: { icon: 'devicon:rabbitmq', color: '#ff6600' },
  redis: { icon: 'devicon:redis', color: '#dc382d' },
  docker: { icon: 'devicon:docker', color: '#2496ed' },
  iis: { icon: 'devicon:azuredevops', color: '#0078d7' },
  linux: { icon: 'simple-icons:linux', color: '#3c873a' },
  nginx: { icon: 'devicon:nginx', color: '#009639' },
  aws: { icon: 'devicon:amazonwebservices', color: '#ff9900' },
  azuredevops: { icon: 'devicon:azure', color: '#0078d4' },
  cicd: { icon: 'lucide:git-compare-arrows', color: '#0891b2' },
  langgraph: { icon: 'lucide:network', color: '#1c3c3c' },
  langchain: { icon: 'simple-icons:langchain', color: '#1c3c3c' },
  harness: { icon: 'lucide:terminal', color: '#475569' },
  claudecode: { icon: 'devicon:claudecode', color: '#d97757' },
  git: { icon: 'devicon:git', color: '#f05032' },
}

export const heroStack: IconKey[] = ['dotnet', 'react', 'azuredevops', 'sqlserver', 'docker']
