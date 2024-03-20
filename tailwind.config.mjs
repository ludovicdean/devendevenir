/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'accent': "var(--accent)",
				'accent-dark': "var(--accent-dark)",
				'black': "var(--black)",
				'gray': "var(--gray)",
				'gray-dark': "var(--gray-dark)",
				'gray-light': "var(--gray-light)",
				'gray-gradient': "var(--gray-gradient)",
				'box-shadow': "var(--box-shadow)"
			},
			backgroundColor: {
				'custom-gray': "var(--gray)",
			}
		},
	},
	plugins: [],
}
