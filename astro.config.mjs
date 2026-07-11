// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi'


// When using with Starlight or other markdown-processing integrations, place mermaid first

// https://astro.build/config
export default defineConfig({
	integrations: [
		mermaid({
			theme: 'default',
			autoTheme: true
		}),
		starlight({
			title: 'WebODM',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true
			},
			favicon: './src/assets/favicon.svg',
			editLink: {
				baseUrl: 'https://github.com/WebODM/Docs/edit/main/',
			},
			components: {
				EditLink: './src/components/EditLink.astro',
			},
			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						base: 'api/reference',
						schema: './swagger.json',
						// schema: 'http://localhost:8000/swagger?format=openapi',
						label: "Reference",
						collapsed: true,
						sidebar: {
							operations: {
								badges: true,
								labels: "summary"
							}
						}
					},
				]),
			],

			customCss: [
				'./src/styles/custom.css',
			],
			social: [
				{ icon: 'discourse', label: 'Community', href: 'https://webodm.org/community' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/WebODM/WebODM' }
			],
			sidebar: [
				{
					label: 'Installation',
					slug: 'installation'
				},
				{
					label: 'Ground Control Points',
					slug: 'ground-control-points'
				},
				{
					label: 'Multispectral and Thermal',
					slug: 'multispectral'
				},
				{
					label: 'Tutorials',
					items: [
						{
							label: 'Creating Quality Orthophotos',
							slug: 'tutorials/creating-high-quality-orthophotos'
						},
						{
							label: 'Digital Elevation Models',
							slug: 'tutorials/creating-digital-elevation-models'
						},
						{
							label: '3D Viewer',
							slug: 'tutorials/potree-3d-viewer'
						},
						{
							label: 'Measuring Stockpiles',
							slug: 'tutorials/measuring-stockpile-volume'
						},
						{
							label: 'Large Datasets',
							slug: 'tutorials/large-datasets'
						},
						{
							label: 'Using Docker',
							slug: 'tutorials/using-docker'
						},
						{
							label: 'Using Podman',
							slug: 'tutorials/using-podman'
						},
						{
							label: 'Calibrating the Camera',
							slug: 'tutorials/calibrating-the-camera'
						},
						{
							label: 'Using Image Masks',
							slug: 'tutorials/using-image-masks'
						},
						{
							label: 'Using Singularity',
							slug: 'tutorials/using-singularity'
						},
						{
							label: 'Options Selection Guide',
							slug: 'tutorials/options-selection-guide'
						},
					]
				},
				{
					label: 'Flying Tips',
					slug: 'flying-tips'
				},
				{
					label: 'Options & Flags',
					slug: 'options-flags'
				},
				{
					label: 'Mission Planning',
					slug: 'mission-planning'
				},
				{
					label: 'Frequently Asked Questions',
					slug: 'faq'
				},
				{
					label: 'Support the Project',
					slug: 'support-the-project'
				},
				{
					label: 'Feedback & Feature Requests',
					slug: 'feedback-feature-requests'
				},
				{
					label: 'Developers',
					items: [
						{
							label: 'Contributing',
							slug: 'contributing'
						},
						{
							label: 'Architecture',
							slug: 'architecture'
						},
						{
							label: 'Roadmap',
							slug: 'roadmap'
						},
						{
							label: 'Plugin Development Guide',
							slug: 'plugin-development-guide'
						},
					]
				},
				{
					label: 'API',
					items: [
						{
							label: 'Quickstart',
							slug: 'api/quickstart'
						},
						{
							label: 'Authentication',
							slug: 'api/authentication'
						},
						{
							label: 'Task',
							slug: 'api/task'
						},
						{
							label: 'Permissions',
							slug: 'api/permissions'
						},
						{
							label: 'Handling Errors',
							slug: 'api/handlingerrors'
						},
						...openAPISidebarGroups
					]
				},
			],
		}),
	],
});
