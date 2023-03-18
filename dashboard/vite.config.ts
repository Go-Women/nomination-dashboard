import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	ssr: {
		noExternal:
			process.env.NODE_ENV === 'production'
				? ['@carbon/charts', 'carbon-components']
				: [],
	},
};

export default config;
