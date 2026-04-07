// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'WebODM',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true
			},
			favicon: './src/assets/favicon.svg',
			editLink: {
				baseUrl: 'https://github.com/WebODM/WebODM/edit/master/docs/',
			},
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
						}
					]
				},
				{
					label: 'Flying Tips',
					slug: 'flying-tips'
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
						{
							label: 'API Quickstart',
							slug: 'quickstart'
						},
						{
							label: 'API Reference',
							autogenerate: { directory: 'reference' },
						},
					]
				},
			],
		}),
	],
});
