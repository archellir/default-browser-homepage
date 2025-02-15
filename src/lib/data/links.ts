interface Link {
  name: string;
  url: string;
  description?: string;
}

export const personalLinks: Link[] = [
  { name: '👤 About Me', url: 'https://arcbjorn.com/', description: 'Personal website' },
  { name: '📝 Blog', url: 'https://blog.arcbjorn.com/', description: 'Technical blog & thoughtbook' },
  { name: '📊 Dashboard', url: 'https://dashboard.arcbjorn.com/', description: 'Services dashboard' },
  { name: '🏗️ Infrastructure', url: 'https://infra.arcbjorn.com', description: 'Projects infrastructure' },
  { name: '🗄️ Git Server', url: 'https://git.arcbjorn.com/', description: 'Self-hosted Git service' },
  { name: '📁 Lab Files', url: 'https://server.arcbjorn.com/', description: 'Server file storage' },
  { name: '📋 Logs', url: 'https://logs.arcbjorn.com', description: 'Services logs' },
  { name: '⏱️ Uptime', url: 'https://uptime.arcbjorn.com/status', description: 'Services uptime' },
  {
    name: '🐙 Archellir GitHub',
    url: 'https://github.com/archellir',
    description: 'Personal projects organization'
  },
  {
    name: '📈 Analytics',
    url: 'https://analytics.arcbjorn.com',
    description: 'Personal projects analytics'
  },
  {
    name: '🤖 Projects (Claude)',
    url: 'https://claude.ai/project/56eb0512-6724-4d18-b85f-5f5d9747c164',
    description: 'Personal project chats with Claude'
  }
];

export const toolLinks: Link[] = [
  {
    name: '🤖 ChatGPT',
    url: 'https://chatgpt.com/',
    description: 'General inquiries and questions'
  },
  {
    name: '🧠 Claude',
    url: 'https://claude.ai/',
    description: 'General AI assistant'
  }
];

export const businessLinks: Link[] = [
  { name: '🏢 Company', url: 'https://arkydev.com/', description: 'Company website' },
  {
    name: '💰 Tax Calculator',
    url: 'https://tax.arcbjorn.com/',
    description: 'Income tax calculator'
  },
  {
    name: '📊 Tax Service',
    url: 'https://eservices.rs.ge/',
    description: 'Revenue Service'
  },
  {
    name: '💼 Work (Claude)',
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
  },
  {
    name: '🦕 Deno Deploy',
    url: 'https://dash.deno.com',
    description: 'Edge runtime platform'
  },
  {
    name: '🚀 Vercel',
    url: 'https://vercel.com/olegs-projects-bed7d8a2',
    description: 'Cloud deployments platform'
  }
];

export const funLinks: Link[] = [
  {
    name: '📺 YouTube',
    url: 'https://youtube.com',
    description: 'Video streaming platform'
  },
  {
    name: '🎥 Arc Moto World',
    url: 'https://youtube.com/@arcmotoworld',
    description: 'My motorcycle channel'
  },
  {
    name: '📰 Hacker News',
    url: 'https://news.ycombinator.com',
    description: 'Tech news and discussions'
  },
  {
    name: '📸 Arc Moto Garage',
    url: 'https://www.instagram.com/arc.motos.garage',
    description: 'My motorcycle garage'
  },
  {
    name: '🎬 Netflix',
    url: 'https://netflix.com',
    description: 'Movies and TV shows'
  },
  {
    name: '🎮 Twitch',
    url: 'https://twitch.tv',
    description: 'Live streaming platform'
  },
  {
    name: '✨ Disney+',
    url: 'https://disneyplus.com',
    description: 'Disney streaming service'
  }
];

export const learningLinks: Link[] = [
	{ name: '🧩 LeetCode', url: 'https://leetcode.com/problemset/', description: 'Coding practice' },
	{
		name: '🎯 Exercism',
		url: 'https://exercism.org/tracks',
		description: 'Coding exercises & practice'
	},
	{
		name: '⚔️ Codewars',
		url: 'https://www.codewars.com/kata/latest/my-languages?beta=false',
		description: 'Coding challenges & practice'
	}
]; 
