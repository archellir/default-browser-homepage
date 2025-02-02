interface Link {
  name: string;
  url: string;
  description?: string;
}

export const personalLinks: Link[] = [
  { name: 'About Me', url: 'https://arcbjorn.com/', description: 'Personal website' },
  { name: 'Blog', url: 'https://blog.arcbjorn.com/', description: 'Technical blog & thoughtbook' },
  { name: 'Dashboard', url: 'https://dashboard.arcbjorn.com/', description: 'Services dashboard' },
  { name: 'Infrastructure', url: 'https://infra.arcbjorn.com', description: 'Projects infrastructure' },
  { name: 'Git Server', url: 'https://git.arcbjorn.com/', description: 'Self-hosted Git service' },
  { name: 'Lab Files', url: 'https://server.arcbjorn.com/', description: 'Server file storage' },
  { name: 'Logs', url: 'https://logs.arcbjorn.com', description: 'Services logs' },
  { name: 'Uptime', url: 'https://uptime.arcbjorn.com/status', description: 'Services uptime' },
  {
    name: 'Archellir GitHub',
    url: 'https://github.com/archellir',
    description: 'Personal projects organization'
  },
  {
    name: 'Analytics',
    url: 'https://analytics.arcbjorn.com',
    description: 'Personal projects analytics'
  }
];

export const toolLinks: Link[] = [
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    description: 'General inquiries and questions'
  },
  {
    name: 'Claude',
    url: 'https://claude.ai/',
    description: 'General AI assistant'
  }
];

export const businessLinks: Link[] = [
  { name: 'Company', url: 'https://arkydev.com/', description: 'Company website' },
  {
    name: 'Tax Calculator',
    url: 'https://tax.arcbjorn.com/',
    description: 'Income tax calculator'
  },
  {
    name: 'Tax Service',
    url: 'https://eservices.rs.ge/',
    description: 'Revenue Service'
  },
  {
    name: 'Work Projects (Claude)',
    url: 'https://claude.ai/project/38dfce20-5e45-43cd-b64f-3272d4f2a623',
    description: 'Work-related project chats with Claude'
  }
];

export const cloudLinks: Link[] = [
  {
    name: '☁️ Hetzner',
    url: 'https://console.hetzner.cloud',
    description: 'Cloud servers provider'
  },
  {
    name: '🌐 Beget',
    url: 'https://beget.com/panel',
    description: 'Hosting provider'
  },
  {
    name: '🐷 Porkbun',
    url: 'https://porkbun.com/account/domains',
    description: 'Domain registrar'
  },
  {
    name: '⚡ Cloudflare',
    url: 'https://dash.cloudflare.com',
    description: 'DNS & CDN provider'
  }
]; 