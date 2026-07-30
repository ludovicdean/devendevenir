/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: 'var(--brand)',
					hover: 'var(--brand-hover)',
				},
				accent: {
					DEFAULT: 'var(--accent)',
					hover: 'var(--accent-hover)',
				},
				surface: {
					DEFAULT: 'var(--color-bg)',
					elevated: 'var(--color-bg-elevated)',
				},
				content: {
					DEFAULT: 'var(--color-text)',
					muted: 'var(--color-text-muted)',
					heading: 'var(--color-heading)',
				},
				chrome: {
					from: 'var(--chrome-from)',
					to: 'var(--chrome-to)',
				},
				gray: 'var(--gray)',
			},
			borderColor: {
				DEFAULT: 'var(--color-border)',
			},
		},
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
}
