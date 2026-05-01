// Cloudflare Workers / OpenNext adapter config
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

import('./src/server.js').catch(() => {});
