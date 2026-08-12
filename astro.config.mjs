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
			defaultLocale: 'root',
			locales: {
			  // English docs at the root of `src/content/docs/`
			  root: {
				label: 'English',
				lang: 'en'
			  },
			  // Italian docs in `src/content/docs/it/`
			  it: {
				label: 'Italiano',
				lang: 'it'
			  }
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
					translations: {
						it: "Installazione"
					},
					slug: 'installation'
				},
				{
					label: 'Ground Control Points',
					translations: {
						it: "Punti di Controllo a Terra"
					},
					slug: 'ground-control-points'
				},
				{
					label: 'Multispectral and Thermal',
					translations: {
						it: "Multispettrale e Termico"
					},
					slug: 'multispectral'
				},
				{
					label: 'Tutorials',
					translations: {
						it: "Tutorial"
					},
					items: [
						{
							label: 'Creating Quality Orthophotos',
							slug: 'tutorials/creating-high-quality-orthophotos',
							translations: {
								it: "Creazione di Ortofoto di Qualità"
							}
						},
						{
							label: 'Digital Elevation Models',
							slug: 'tutorials/creating-digital-elevation-models',
							translations: {
								it: "Modelli Digitali di Elevazione"
							}
						},
						{
							label: '3D Viewer',
							slug: 'tutorials/potree-3d-viewer',
							translations: {
								it: "Visualizzatore 3D"
							}
						},
						{
							label: 'Measuring Stockpiles',
							slug: 'tutorials/measuring-stockpile-volume',
							translations: {
								it: "Misurazione di Cumuli"
							}
						},
						{
							label: 'Large Datasets',
							slug: 'tutorials/large-datasets',
							translations: {
								it: "Grandi Set di Dati"
							}
						},
						{
							label: 'Using Docker',
							slug: 'tutorials/using-docker',
							translations: {
								it: "Uso di Docker"
							}
						},
						{
							label: 'Using Podman',
							slug: 'tutorials/using-podman',
							translations: {
								it: "Uso di Podman"
							}
						},
						{
							label: 'Calibrating the Camera',
							slug: 'tutorials/calibrating-the-camera',
							translations: {
								it: "Calibrazione della Fotocamera"
							}
						},
						{
							label: 'Using Image Masks',
							slug: 'tutorials/using-image-masks',
							translations: {
								it: "Uso di Maschere di Immagine"
							}
						},
						{
							label: 'Using Singularity',
							slug: 'tutorials/using-singularity',
							translations: {
								it: "Uso di Singularity"
							}
						},
						{
							label: 'Options Selection Guide',
							slug: 'tutorials/options-selection-guide',
							translations: {
								it: "Guida alla Selezione delle Opzioni"
							}
						},
					]
				},
				{
					label: 'Flying Tips',
					slug: 'flying-tips',
					translations: {
						it: "Consigli di Volo"
					}
				},
				{
					label: 'Options & Flags',
					slug: 'options-flags',
					translations: {
						it: "Opzioni e Flag"
					}
				},
				{
					label: 'Mission Planning',
					slug: 'mission-planning',
					translations: {
						it: "Pianificazione della Missione"
					}
				},
				{
					label: 'Frequently Asked Questions',
					slug: 'faq',
					translations: {
						it: "Domande Frequenti"
					}
				},
				{
					label: 'Support the Project',
					slug: 'support-the-project',
					translations: {
						it: "Sostieni il Progetto"
					}
				},
				{
					label: 'Feedback & Feature Requests',
					slug: 'feedback-feature-requests',
					translations: {
						it: "Feedback e Richieste di Funzionalità"
					}
				},
				{
					label: 'Developers',
					translations: {
						it: "Sviluppatori"
					},
					items: [
						{
							label: 'Contributing',
							slug: 'contributing',
							translations: {
								it: "Contribuire"
							}
						},
						{
							label: 'Architecture',
							slug: 'architecture',
							translations: {
								it: "Architettura"
							}
						},
						{
							label: 'Roadmap',
							slug: 'roadmap',
							translations: {
								it: "Roadmap"
							}
						},
						{
							label: 'Plugin Development Guide',
							slug: 'plugin-development-guide',
							translations: {
								it: "Guida allo Sviluppo di Plugin"
							}
						},
					]
				},
				{
					label: 'API',
					translations: {
						it: "API"
					},
					items: [
						{
							label: 'Quickstart',
							slug: 'api/quickstart',
							translations: {
								it: "Avvio Rapido"
							}
						},
						{
							label: 'Authentication',
							slug: 'api/authentication',
							translations: {
								it: "Autenticazione"
							}
						},
						{
							label: 'Task',
							slug: 'api/task',
							translations: {
								it: "Task"
							}
						},
						{
							label: 'Permissions',
							slug: 'api/permissions',
							translations: {
								it: "Permessi"
							}
						},
						{
							label: 'Handling Errors',
							slug: 'api/handlingerrors',
							translations: {
								it: "Gestione degli Errori"
							}
						},
						...openAPISidebarGroups
					]
				},
			],
		}),
	],
});
